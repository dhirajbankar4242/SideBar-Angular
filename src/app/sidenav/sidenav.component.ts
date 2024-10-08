import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{

  // constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  @Output () onToggleSideNav: EventEmitter <SideNavToggle> = new EventEmitter();

  collapsed = false
  screenWidth = 0;

  @HostListener('window:resize', ['$event'])

  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void{
    this.screenWidth = window.innerWidth
  }

//   @HostListener('window:resize', ['$event.target.innerWidth'])
//   onResize(width: number) {
//     this.screenWidth = width;
//   }

// ngOnInit(): void {
//   if (isPlatformBrowser(this.platformId)) {
//     this.screenWidth = window.innerWidth;
//   }
// }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

}
