export interface AuthDataResponse{
    id:number;
    roleName:string;
    rolePermissions:RolePermissions[];
}

export interface RolePermissions{
    id:number;
    displayName:string;
    permissionName:string;
}