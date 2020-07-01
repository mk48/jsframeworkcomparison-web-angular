import { Component } from '@angular/core';
import { apiService } from './app.service';
import { SocketioService } from './socketio.service';
import { CompanyDto } from './companyDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private _apiservice: apiService,
    private _socketioService: SocketioService
  ) {}
  companies: CompanyDto[];
  value: number = 0;
  title = 'jsframeworkcomparison-web-angular';

  ngOnInit() {
    this._apiservice.getCompanies().subscribe((data) => {
      this.companies = data;
    });

    this._socketioService.setupSocketConnection();

    this._socketioService.getStockUpdates().subscribe((data) => {
      //console.log(data);
      const companiesLatestUpdated = this.companies.map((comp) => {
        const dataForThisComp = data.find((d: CompanyDto) => d.id === comp.id);
        if (dataForThisComp) {
          return dataForThisComp;
        } else {
          return comp;
        }
      });

      this.companies = companiesLatestUpdated;
    });
  }

  increment() {
    console.log('incre');
    this.value += 1;
  }

  decrement() {
    console.log('decre');
    this.value -= 1;
  }
}
