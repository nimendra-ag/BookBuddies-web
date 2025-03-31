provider "aws" {
  region = "eu-north-1"
  access_key = var.AKIAYQNJS22XRJLXE27A
  secret_key = var.Ag8NBZzSSMwHNGKTjCMuffQdb+msJI/ARbJtJzK5
}

resource "aws_instance" "bookbuddies_server" {
  ami           = "ami-09a9858973b288bdd" # Ensure this AMI exists in your region
  instance_type = "t3.micro"
  key_name      = "BookBuddiesKey"

  vpc_security_group_ids = [aws_security_group.bookbuddies_sg.id]

  tags = {
    Name = "BookBuddies-Server"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker docker-compose
              systemctl start docker
              systemctl enable docker
              EOF
}

resource "aws_security_group" "bookbuddies_sg" {
  name        = "bookbuddies-security-group"
  description = "Allow SSH, HTTP, and custom ports"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "instance_public_ip" {
  value = aws_instance.bookbuddies_server.public_ip
}
