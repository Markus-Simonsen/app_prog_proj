import { Routes } from '@angular/router';
import { ShitterList } from './shitter-list/shitter-list';
import { AshitList } from './ashit-list/ashit-list';
import { ToiletList } from './toilet-list/toilet-list';
import { ShitSearch } from './shit-search/shit-search';
import { ShitInfo } from './shit-info/shit-info';
import { ShitMap } from './shit-map/shit-map';

export const routes: Routes = [
  { path: 'shitters', component: ShitterList },
  { path: 'ashits', component: AshitList },
  { path: 'toilet', component: ToiletList },
  { path: 'shit-map/:location', component: ShitMap },
  { path: 'shit-info/:toiletid', component: ShitInfo },
  { path: 'shit-search', component: ShitSearch },
];
