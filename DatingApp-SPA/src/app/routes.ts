import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberlistsComponent } from '../app/members/member-lists/memberlists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardDetailComponent } from './members/member-card-detail/member-card-detail.component';
import { MemberDetailResolver } from './resolvers/member-detailed-resolver';
import { MemberListResolver } from './resolvers/member-list-resolver';

export const Approutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate: [AuthGuard],
        children:[
            { path: 'memberlists', component: MemberlistsComponent, resolve: {users : MemberListResolver} },
            { path: 'memberlists/:id', component: MemberCardDetailComponent, resolve: {user: MemberDetailResolver} },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },    
    { path: '**', redirectTo:'', pathMatch : 'full'  }
];
