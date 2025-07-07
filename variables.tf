
variable "resource_group_name" {
  description = "Name of the Resource Group"
}

variable "tags" {
  description = "Tags for Azure resources"
  type        = map(string)
  default     = {}
}

variable "vnet_name" {
  description = "Virtual Network name"
}

variable "subnet_name" {
  description = "Subnet name"
}

variable "nsg_name" {
  description = "Network Security Group name"
}

variable "public_ip_name" {
  description = "Public IP name"
}

variable "public_ip_allocation" {
  description = "Public IP allocation method"
}

variable "nic_name" {
  description = "Network Interface name"
}

variable "ip_configuration_name" {
  description = "Name of the IP configuration"
}

variable "vm_name" {
  description = "Virtual Machine name"
}

variable "vm_size" {
  description = "Size of the Virtual Machine"
}

variable "admin_username" {
  description = "Admin username for the VM"
}
