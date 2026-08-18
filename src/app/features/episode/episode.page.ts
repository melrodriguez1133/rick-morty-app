import { Component, OnInit } from '@angular/core';
 import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { CardComponent } from "src/app/shared/components/card/card.component";
  import { ApiResponse } from "src/app/core/models/api-response.model";
import { EpisodeService } from "src/app/core/services/episode-service";
import { Episode } from "src/app/core/models/episode.model";

@Component({
  selector: 'app-episode',
  templateUrl: './episode.page.html',
  styleUrls: ['./episode.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule,CardComponent,HeaderComponent]
})
export class EpisodePage implements OnInit {
  episodes: Episode[] = [];
  responseApi: ApiResponse<Episode>= { info: { count: 0, pages: 0, next: "", prev: "" }, results: [] };
  constructor(private episodeService: EpisodeService) { }

  ngOnInit() {
    this.episodeService.getEpisodes().subscribe((data) => {
      this.episodes = data.results;
      this.responseApi = data;
      console.log('Episodes:', this.episodes);
      console.log('API Response:', this.responseApi);
    });
  }

}
