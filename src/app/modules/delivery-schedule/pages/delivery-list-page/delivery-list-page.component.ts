import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { modalConfigOpt } from 'src/utils/const';
import { Delivery } from '../../models/delivery';

@Component({
  selector: 'app-delivery-list-page',
  templateUrl: './delivery-list-page.component.html',
  styleUrls: ['./delivery-list-page.component.scss']
})
export class DeliveryListPageComponent implements OnInit {
  isFullScreen: boolean;
  deliverySelected: Delivery;
  modalRef: BsModalRef;

  groupA: Delivery[] = [
    {
      id: '1',
      client: 'Juan Lopez',
      date: '12-04-2018',
      time: '11:15 AM',
      articles: [
        {id: '1', name: 'Shampoo'},
        {id: '2', name: 'Jabon'}
      ],
      wasDelivered: false
    },
    {
      id: '2',
      client: 'Pepe Rodriguez',
      date: '12-04-2018',
      time: '11:25 AM',
      articles: [
        {id: '1', name: 'Shampoo'},
        {id: '2', name: 'Jabon'},
        {id: '3', name: 'Pala'},
        {id: '4', name: 'Pico'},
        {id: '5', name: 'Arena'},
        {id: '6', name: 'Cemento'}
      ],
      wasDelivered: false
    }
  ] 

  groupB: Delivery[] = [
    {
      id: '1',
      client: 'Juana Aquino',
      date: '12-04-2018',
      time: '1:15 PM',
      articles: [
        {id: '1', name: 'Pala'},
        {id: '2', name: 'Pico'}
      ],
      wasDelivered: true
    },
    {
      id: '2',
      client: 'Pepe Rodriguez',
      date: '12-04-2018',
      time: '1:25 PM',
      articles: [
        {id: '1', name: 'Arena'},
        {id: '2', name: 'Cemento'}
      ],
      wasDelivered: false
    },
    {
      id: '3',
      client: 'Pepe Rodriguez',
      date: '12-04-2018',
      time: '1:20 PM',
      articles: [
        {id: '1', name: 'Arena'},
      ],
      wasDelivered: false
    },
    {
      id: '4',
      client: 'Pepe Rodriguez',
      date: '12-04-2018',
      time: '1:20 PM',
      articles: [
        {id: '1', name: 'Cemento'},
      ],
      wasDelivered: false
    }
  ] 

  groupC: Delivery[] = [
    {
      id: '1',
      client: 'Jhoan Guzman',
      date: '12-04-2018',
      time: '10:12 AM',
      articles: [
        {id: '1', name: 'Shampoo'},
        {id: '2', name: 'Jabon'}
      ],
      wasDelivered: true
    },
    {
      id: '2',
      client: 'Pepe Rodriguez',
      date: '12-04-2018',
      time: '10:25 AM',
      articles: [
        {id: '1', name: 'Shampoo'},
        {id: '2', name: 'Jabon'}
      ],
      wasDelivered: false
    }
  ] 

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    // this.openfullScreen();
  }

  openfullScreen() {
    console.log('OPENING')
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem.requestFullscreen || elem['mozRequestFullscreen'] || elem['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(elem)
    }
    this.isFullScreen = true;
  }

  closeModal(): void {
    this.modalRef.hide()
    this.deliverySelected = null
  }

  confirmDelivery(): void {

  }

}
