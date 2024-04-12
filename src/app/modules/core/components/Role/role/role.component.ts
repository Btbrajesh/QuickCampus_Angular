import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoledetailModalComponent } from '../../../popups/roledetail-modal/roledetail-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{

  roleList!:any
  page = 1;
	pageSize = 10;
  collectionSize!:number
  searchTerm: string = '';
  pageStart=1
  selectedOption = new FormControl('');
  inputOption = new FormControl('');
  clientList:any
  filteredClientList:any
  val: string = '';
  userId:any
  

  constructor(public clientService:ClientService,private modalService: NgbModal,private spinnerService: NgxSpinnerService,public roleService:RoleService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllRole()
    this.getClient()
    this.userId = localStorage.getItem('userId')
  }

  getAllRole(){
    this.spinnerService.show()
    this.roleService.getAllRole(this.pageStart,this.pageSize).subscribe((res)=>{
      if (res.isSuccess){
        this.collectionSize = res.totalRecordCount
        this.roleList = []
        this.roleList = res.data.map((role:any,i:number)=>({id:i+1, ...role}))
        this.spinnerService.hide()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    },err =>{
      this.spinnerService.hide()
      this.toastr.error(err)
    })
  }

  getClient(){
    this.clientService.getAllClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
        this.filteredClientList = res.data
      }
    },err=>{
      this.toastr.error(err)
    })
  }
  
  onSelected(event:any){
    const clientId = event.value
    this.roleService.getRoleListOnClientId(clientId,this.pageStart,this.pageSize).subscribe((res:any)=>{
      if (res.isSuccess){
        this.roleList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.roleList = res.data;
        this.collectionSize = res.totalRecordCount;
        this.toastr.error(res.message)
      }
    })
  }
  
  filterOptions() {
    if (this.clientList) { // Check if this.clientList is defined
      this.filteredClientList = this.clientList.filter((client:any) => {
        // Check if client.name and this.val are not null before calling toLowerCase()
        if (client.name && this.val) {
          return client.name.toLowerCase().includes(this.val.toLowerCase());
        }
        return false; // Return false if either client.name or this.val is null
      });
    } else {
      this.filteredClientList = []; // Set filteredClientList to an empty array if this.clientList is undefined
    }
  }
  resetSelect() {
    this.selectedOption.reset(); // Reset selected option
    this.inputOption.reset();
    this.getAllRole() 
    this.getClient()
  }

  getRolePage(event:any){
    this.pageStart = event
    this.getAllRole()
  }

  getCollectionPage(){
    this.pageStart = 1
    this.getAllRole()
  }

  viewDetails(itemId: number): void {
    const modalRef = this.modalService.open(RoledetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.itemId = itemId;
  }

  deleteItem(itemId: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.itemId = itemId;
    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.roleService.deleteRole(itemId).subscribe((res)=>{
          this.toastr.success(res.message)
          this.getAllRole()
        }
        )
      }
    })
  }

  onSearch() {
    this.roleService.searchData(this.searchTerm,this.pageStart,this.pageSize).subscribe((res:any) => {
      if (res.isSuccess){
        this.roleList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.roleList = res.data;
        this.collectionSize = res.totalRecordCount;
      } 
    });
  }
  
  toggleActive(id:number){
    this.spinnerService.show()
    this.roleService.toggleActiveInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getAllRole()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    })
  }

}
