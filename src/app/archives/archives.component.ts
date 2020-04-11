import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  TemplateRef,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ArchiveService } from './archives.service'
import { markdown } from 'markdown'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { setUser } from '../auth/auth.actions'
import { Router } from '@angular/router'

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss'],
})
export class ArchivesComponent implements OnInit {
  constructor(
    private modalSerivce: BsModalService,
    private archiveService: ArchiveService,
    private authStore: Store<{ auth: any }>,
    private router: Router
  ) {}

  @ViewChild('staticBackdrop', { static: true }) content: ElementRef<any>

  // modalOptions = {
  //   backdrop:'static',
  //   backdropClass:'customBackdrop'
  // }

  modalRef: BsModalRef
  allArchives: any[]
  filteredArchives: any[]
  searchTerm = ''
  itemsPerPage = 30
  currentPage = 1
  range = { start: 1, end: this.itemsPerPage }
  reddit
  toggleDropdown = true
  searchType = 'ordinary'
  me$: Observable<any>

  ///current clicked archive
  currentArchive
  currentArchiveComments: any[]
  commentsToMarkdown
  commentsTree
  ///

  ngOnInit() {
    /// set store if available in localstorage
    if (localStorage.getItem('email')) {
      this.authStore.dispatch(setUser({ email: localStorage.getItem('email') }))
    }

    /// get all megalinks record
    this.archiveService.getArchives().subscribe((data) => {
      this.allArchives = data
      this.filteredArchives = data
    })

    /// get user name
    this.me$ = this.authStore.pipe(select('auth'))
    this.me$.subscribe((data) => {})
  }

  openModal(template: TemplateRef<any>, archive) {
    this.archiveService.getArchiveComments(archive.idstr).subscribe((data) => {
      this.currentArchive = archive
      this.currentArchiveComments = data
      this.commentsTree = this.commentsToTree(this.currentArchiveComments)
    })
    this.reddit = markdown.toHTML(
      `**r/${archive.subreddit}** • _posted by_  u/${archive.author}`
    )
    this.modalRef = this.modalSerivce.show(template, {
      class: 'archive-modal modal-lg',
    })
  }

  searchAndFilter() {
    this.currentPage = 1
    this.updateRowRange()
    switch (this.searchType) {
      case 'ordinary':
        this.ordinarySearch()
        break
      case 'keyword':
        this.keywordSearch()
        break
      case 'deep':
        this.deepSearch()
        break
      default:
        this.ordinarySearch()
        break
    }
  }

  updateRowRange() {
    this.range.start = (this.currentPage - 1) * this.itemsPerPage
    this.range.end = this.currentPage * this.itemsPerPage
  }

  markToHtml(markString: string | Array<string>) {
    if (typeof markString === 'string') return markdown.toHTML(markString)
    return markString.map((str) => markdown.toHTML(str))
  }

  commentsToTree(list) {
    let map = {},
      node,
      roots = []
    list.forEach((item, key) => {
      map[item.idstr] = key // initialize the map
      item.children = [] // initialize the children
    })

    list.forEach((item) => {
      node = item
      if (node.parent !== this.currentArchive.idstr) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parent]].children.push(node)
      } else {
        roots.push(node)
      }
    })
    return roots
  }

  setSearchType(type: string) {
    this.searchType = type
    this.searchAndFilter()
  }

  titleCase(str) {
    str = str.toLowerCase().split(' ')
    str = str.map((char) => {
      char = char.charAt(0).toUpperCase() + char.slice(1)
      return char
    })
    return str.join(' ')
  }

  ordinarySearch() {
    this.filteredArchives = this.allArchives.filter((archive) => {
      return archive.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
  }
  keywordSearch() {
    this.filteredArchives = this.allArchives.filter((archive) => {
      let chunkedArchiveTitle: Array<string> = archive.title
        .toLowerCase()
        .split(' ')
      const chunkedSearchTerm = this.searchTerm.toLowerCase().split(' ')
      return chunkedSearchTerm.every((sT) => {
        const ind = chunkedArchiveTitle.findIndex((cAT) =>
          cAT.includes(sT.toLowerCase())
        )
        if (ind >= 0) {
          chunkedArchiveTitle = chunkedArchiveTitle.splice(
            ind + 1,
            chunkedArchiveTitle.length - 1
          )
          return true
        } else {
          return false
        }
      })
    })
  }
  deepSearch() {
    this.filteredArchives = this.allArchives.filter((archive) => {
      let spreadedArchiveTitle = [...archive.title.toLowerCase()]
      const spreadedSearchTerm = [...this.searchTerm]
      return spreadedSearchTerm.every((sT) => {
        const ind = spreadedArchiveTitle.indexOf(sT.toLowerCase())
        if (ind >= 0) {
          spreadedArchiveTitle = spreadedArchiveTitle.splice(
            ind + 1,
            spreadedArchiveTitle.length - 1
          )
          return true
        } else {
          return false
        }
      })
    })
  }

  logout() {
    localStorage.removeItem('email')
    this.router.navigate(['/home'])
  }
}
