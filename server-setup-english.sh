#!/bin/bash

echo "Starting Feisima website server setup..."

# Update system
echo "Updating system packages..."
yum update -y

# Install Node.js
echo "Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
yum install -y nodejs

# Verify installation
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install PM2
echo "Installing PM2..."
npm install -g pm2

# Install Nginx
echo "Installing Nginx..."
yum install -y nginx
systemctl enable nginx
systemctl start nginx

# Install Git
echo "Installing Git..."
yum install -y git

# Create project directory
echo "Creating project directory..."
mkdir -p /var/www/feisima
cd /var/www/feisima

# Configure firewall
echo "Configuring firewall..."
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --reload

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/conf.d/feisima.conf << 'EOF'
server {
    listen 80;
    server_name 43.136.88.79 _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

# Test and reload Nginx
nginx -t && systemctl reload nginx

echo ""
echo "Server environment setup completed!"
echo "Configuration info:"
echo "   - Node.js: $(node --version)"
echo "   - NPM: $(npm --version)"
echo "   - PM2: installed"
echo "   - Nginx: configured"
echo "   - Project directory: /var/www/feisima"
echo ""
echo "Next step: Upload Feisima project code"
echo "   Access URL: http://43.136.88.79"
echo ""