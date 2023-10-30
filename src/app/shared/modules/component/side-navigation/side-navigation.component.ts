import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavigation } from 'src/app/shared/models/INavigation';
import { SideNavigationService } from '../../services/side-navigation.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, startWith } from 'rxjs';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit, OnDestroy {

  menuItems: INavigation[] = [];
  private _subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private _sideNavigation: SideNavigationService
  ) {
  }

  ngOnInit(): void {
    this.menuItems = this._sideNavigation.getMenuItems();

    this._subscriptions.push(
      this._router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this._router)
      ).subscribe(event => {
        const url: string = (event instanceof NavigationEnd) ? event.url : this._router.url;
        const urlSegments = url.split('/').filter(f => f);

        if (urlSegments && urlSegments.length > 0) {
          const moduleName = urlSegments[0];
          const componentName = urlSegments[1];
          if (moduleName) {
            this.menuItems.forEach(f => {
              f.isActive = false;
              if (f.path.toLowerCase().includes(`/${moduleName.toLowerCase()}`)) {
                f.isActive = true;
                if (f.children) {
                  f.expanded = true;
                  f.children.filter(cf => {
                    cf.isActive = false;
                    cf.expanded = false;

                    if (componentName) {
                      if (cf.path.toLowerCase().includes(`/${moduleName.toLowerCase()}/${componentName.toLowerCase()}`)) {
                        cf.isActive = true;
                        cf.expanded = true;
                      }
                    }
                  })
                }
              }
            });
          }
        }
      })
    )
  }

  onMenuItemClick(item: INavigation, isChild: boolean = false): void {
    // this._router.navigate(['/employee', 'details', '2']);
    // this._router.navigate(['/employee/details/2'], { queryParams: { id: 2 } });
    // this._router.navigateByUrl('/employee/details/2')
    //  /employee/details/2
    this._router.navigate([item.path]);
    const menuItems = this.getMenuItems(isChild ? item : undefined);
    menuItems.forEach(f => {
      f.expanded = false;
      f.isActive = false;
    });
  }

  private getMenuItems(item?: INavigation): INavigation[] {
    if (item) {
      const key = item.parentKey;
      return this.menuItems.find(f => f.key === key)?.children || [];
    }
    return this.menuItems;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(f => f.unsubscribe());
  }

}
