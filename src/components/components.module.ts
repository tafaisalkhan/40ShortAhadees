import { NgModule } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu';
import { DuaListComponent } from './dua-list/dua-list';
import { SettingComponent } from './setting/setting';

import { FavoriteComponent } from './favorite/favorite';
@NgModule({
	declarations: [SideMenuComponent,
    DuaListComponent,
    SettingComponent,
    FavoriteComponent],
	imports: [],
	exports: [SideMenuComponent,
    DuaListComponent,
    SettingComponent,
    FavoriteComponent]
})
export class ComponentsModule {}
