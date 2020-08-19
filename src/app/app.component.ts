import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as QrScannerWorker from 'src/lib/qr-scanner-worker.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('video', { static: true }) videoRef: ElementRef;

  qrScanner: any;
  async ngOnInit(): Promise<void> {
    const QrScanner = (await import('src/lib/qr-scanner.min.js')).default;
    this.qrScanner = new QrScanner(
      this.videoRef.nativeElement,
      (result: string) => {
        this.qrScanner.stop();
        console.log('decoded qr code:', result);
      }
    );
    await this.qrScanner.start();
  }

}
