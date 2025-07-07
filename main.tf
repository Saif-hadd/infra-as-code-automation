terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}


data "azurerm_resource_group" "intern-rg" {
  name = var.resource_group_name
}

data "azurerm_ssh_public_key" "demo_key" {
  name                = "ssh_demo_key"
  resource_group_name = data.azurerm_resource_group.intern-rg.name
}

data "azurerm_virtual_network" "intern_vnet" {
  name                = var.vnet_name
  resource_group_name = data.azurerm_resource_group.intern-rg.name
}

data "azurerm_subnet" "default_subnet" {
  name                 = var.subnet_name
  virtual_network_name = data.azurerm_virtual_network.intern_vnet.name
  resource_group_name  = data.azurerm_resource_group.intern-rg.name
}

data "azurerm_network_security_group" "intern_sg" {
  name                = var.nsg_name
  resource_group_name = data.azurerm_resource_group.intern-rg.name
}

resource "azurerm_public_ip" "mes_ip" {
  name                = var.public_ip_name
  resource_group_name = data.azurerm_resource_group.intern-rg.name
  location            = data.azurerm_resource_group.intern-rg.location
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_network_interface" "mes_nic" {
  name                = var.nic_name
  location            = data.azurerm_resource_group.intern-rg.location
  resource_group_name = data.azurerm_resource_group.intern-rg.name

  ip_configuration {
    name                          = var.ip_configuration_name
    subnet_id                     = data.azurerm_subnet.default_subnet.id
    private_ip_address_allocation = var.public_ip_allocation
    public_ip_address_id          = azurerm_public_ip.mes_ip.id
  }
}

resource "azurerm_linux_virtual_machine" "mes_vm" {
  name                            = var.vm_name
  resource_group_name             = data.azurerm_resource_group.intern-rg.name
  location                        = data.azurerm_resource_group.intern-rg.location
  size                            = var.vm_size
  admin_username                  = var.admin_username
  disable_password_authentication = true
  network_interface_ids           = [azurerm_network_interface.mes_nic.id]

  admin_ssh_key {
    username   = var.admin_username
    public_key = data.azurerm_ssh_public_key.demo_key.public_key
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}

output "vm_public_ip" {
  value = azurerm_public_ip.mes_ip.ip_address
}

