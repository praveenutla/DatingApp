import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberlistsComponent } from './memberlists/memberlists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

export const Approutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate: [AuthGuard],
        children:[
            { path: 'memberlists', component: MemberlistsComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },    
    { path: '**', redirectTo:'', pathMatch : 'full'  }
];
