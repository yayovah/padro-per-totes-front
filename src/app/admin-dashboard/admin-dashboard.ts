import { Component } from '@angular/core';
import { selectCiutats } from '../Ciutat/Selectors/ciutats.selector';
import { SelectCiutats } from '../Ciutat/Components/select-ciutats/select-ciutats';

@Component({
  selector: 'app-admin-dashboard',
  imports: [SelectCiutats ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {

}
