import { Routes } from '@angular/router';
import { ShitterList } from './shitter-list/shitter-list';
import { PageUserInput } from './page-user-input/page-user-input';
import { ToiletList } from './toilet-list/toilet-list';
import { ShitSearch } from './shit-search/shit-search';
import { ShitInfo } from './shit-info/shit-info';
import { ShitMap } from './shit-map/shit-map';
import { Welcome } from './welcome/welcome';
import { ThankYou } from './thank-you/thank-you';
import { PageLogIn } from './page-log-in/page-log-in';
import { PageSignUp } from './page-sign-up/page-sign-up';
import { PageReview } from './page-review/page-review';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'thank-you', component: ThankYou },

  { path: 'shitters', component: ShitterList },
  { path: 'page-user-input', component: PageUserInput },
  { path: 'toilet', component: ToiletList },
  { path: 'shit-map/:location', component: ShitMap },
  { path: 'shit-info/:toiletid', component: ShitInfo },
  { path: 'shit-search', component: ShitSearch },
  { path: 'page-log-in', component: PageLogIn },
  { path: 'page-sign-up', component: PageSignUp },
  { path: 'page-review/:toiletid', component: PageReview },
  { path: 'shit-map/:toiletid/:location', component: ShitMap }
];
