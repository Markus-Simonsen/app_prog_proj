import { Routes } from '@angular/router';
import { ShitterList } from './shitter-list/shitter-list';
import { AshitList } from './ashit-list/ashit-list';
import { ToiletList } from './toilet-list/toilet-list';

export const routes: Routes = [
  { path: 'shitters', component: ShitterList },
  { path: 'ashits', component: AshitList },
  { path: 'toilet', component: ToiletList }
];
