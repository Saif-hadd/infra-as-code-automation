

# DevSecOps Microservices Automation Project

A comprehensive DevSecOps project for **automating microservices deployment**, ensuring secure, reliable, and high-performance applications. Streamlines the full lifecycle from infrastructure provisioning to monitoring and QA.

---

## 🚀 Key Features

* **🛠️ Containerization & Orchestration**
  Docker & Docker Compose for multi-container setups with custom networks.

* **☁️ Cloud Infrastructure**
  Provisioned Microsoft Azure resources (VMs, VNets, NSGs) using Terraform (Infrastructure as Code).

* **⚡ Automation & Deployment**
  Automated deployment of Node.js, React, and PostgreSQL microservices using Ansible.
  CI/CD pipelines with GitHub Actions, including:

  * Unit tests
  * SAST/DAST security scans
  * Vulnerability management

* **🧪 QA & Testing**

  * Manual test plans
  * API testing with Postman
  * Automated UI tests with Playwright
  * Bug tracking and resolution with Jira

* **📊 Monitoring & Observability**
  Real-time system metrics and dashboards via Prometheus & Grafana.

* **🤖 Team Collaboration**
  Integrated custom Discord webhooks delivering:

  * Build status (success/failure)
  * Security test artifacts
  * VM details (name, external IP)

---

## 🏗️ Architecture Overview

```
                   +-------------------+
                   |   GitHub Actions  |
                   |  CI/CD Pipeline   |
                   +--------+----------+
                            |
                            v
                +-------------------------+
                |      Ansible Playbooks  |
                | Automates Deployment    |
                +-----------+-------------+
                            |
                            v
          +-----------------+----------------+
          |                                  |
  +-------+-------+                  +-------+-------+
  | Node.js API    |                  | React Frontend|
  | Microservice   |                  | Microservice  |
  +-------+-------+                  +-------+-------+
          |                                  |
          v                                  v
  +-----------------+              +-----------------+
  | PostgreSQL DB   |              | Cloud / Storage |
  +-----------------+              +-----------------+
  
Monitoring & Alerts:
+-------------------------+
| Prometheus & Grafana    |
| Discord Webhooks        |
+-------------------------+
```

---

## ⚡ Technologies Used

* **Containerization & Orchestration**: Docker, Docker Compose
* **Cloud & IaC**: Microsoft Azure, Terraform
* **Automation & Deployment**: Ansible, GitHub Actions
* **Microservices**: Node.js, React, PostgreSQL
* **QA & Testing**: Postman, Playwright, Jira
* **Monitoring**: Prometheus, Grafana
* **Collaboration**: Discord Webhooks

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/devsecops-microservices.git
cd devsecops-microservices
```

### 2. Provision Cloud Infrastructure (Azure)

```bash
cd terraform
terraform init
terraform apply
```

### 3. Deploy Microservices with Ansible

```bash
cd ../ansible
ansible-playbook deploy.yml -i inventory.ini
```

### 4. Run CI/CD (GitHub Actions)

* Push to GitHub branch triggers pipeline:

  * Unit tests
  * Security scans
  * Deployment to Azure VMs

### 5. Monitor & Observe

* Access Prometheus & Grafana dashboards for real-time metrics.
* Receive notifications and build reports on Discord.

---

## 🤝 Contribution

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.


