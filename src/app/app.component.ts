import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [];

  constructor(private db: AngularFirestore,) {
  }

  ngOnInit() {
    this.db.collection(`items`, q => q.orderBy('timestamp', 'desc').limit(10))
    .snapshotChanges().subscribe(serverItems => {
      this.items = [];
      serverItems.forEach(a => {
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.items.push(item);
      });
    });
  }

  add() {
    this.db.collection(`items`).add({
      timestamp: new Date(),
    });
  }

  update(item) {
    this.db.doc(`items/${item.id}`).update({
      timestamp: new Date(),
    });
  }

  delete(item) {
    this.db.doc(`items/${item.id}`).delete();
  }
}
