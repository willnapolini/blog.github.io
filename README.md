# Complete Deployment Guide

## Step 1: Create GitHub Repository

1. **Create a new repository** on GitHub:
   - Name it `username.github.io` (for user/organization pages)
   - Or any name like `my-blog` (for project pages)
   - Make it public
   - Initialize with README

## Step 2: Clone and Setup Locally

```bash
# Clone your repository
git clone https://github.com/username/your-repo-name.git
cd your-repo-name

# Install Ruby and Jekyll (if not already installed)
# On macOS: brew install ruby
# On Ubuntu: sudo apt-get install ruby-full
# On Windows: Use RubyInstaller

# Install Jekyll and Bundler
gem install jekyll bundler

# Create the directory structure and files
mkdir -p _layouts _includes _posts _sass assets/css assets/js assets/images
```

## Step 3: Add All Files

Create all the files from the artifacts above in your repository:

### Required Files Structure:
```
your-blog/
├── _config.yml
├── Gemfile
├── index.html
├── about.md
├── archive.html
├── _layouts/
│   ├── default.html
│   ├── post.html
│   └── page.html
├── _includes/
│   ├── head.html
│   ├── header.html
│   └── footer.html
├── _posts/
│   └── 2025-05-15-future-web-development.md
├── assets/
│   ├── css/
│   │   └── style.scss
│   └── js/
│       └── main.js
└── README.md
```

## Step 4: Configure Your Blog

1. **Edit `_config.yml`**:
   ```yaml
   title: "Your Blog Name"
   description: "Your blog description"
   url: "https://username.github.io"  # Your GitHub Pages URL
   author: "Your Name"
   ```

2. **Update social links** in `_config.yml`:
   ```yaml
   social:
     github: "yourgithubusername"
     twitter: "yourtwitterhandle"
     email: "your.email@example.com"
   ```

## Step 5: Create Your First Post

Create a new file in `_posts/` directory:

**Filename format**: `YYYY-MM-DD-your-post-title.md`

```markdown
---
layout: post
title: "Your First Post"
date: 2025-06-02
author: "Your Name"
category: "Blog"
tags: ["first-post", "hello-world"]
excerpt: "Welcome to my new blog! This is my first post..."
image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop"
read_time: "2 мин"
---

# Welcome to My Blog!

This is my first blog post. Here's what you can expect from this blog:

## What I'll Write About

- Web development tutorials
- Technology reviews
- Personal experiences in coding
- Useful tools and resources

## Getting Started

I'm excited to share my journey with you!
```

## Step 6: Test Locally

```bash
# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve

# Open http://localhost:4000 in your browser
```

## Step 7: Deploy to GitHub Pages

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select "Deploy from a branch"
   - Choose **main** branch
   - Click **Save**

3. **Wait for deployment** (usually 5-10 minutes)
   - Your site will be available at `https://username.github.io/repo-name`

## Step 8: Customize Your Blog

### Adding New Posts
Create new `.md` files in `_posts/` with proper front matter.

### Customizing Design
- Edit CSS in `assets/css/style.scss`
- Modify layouts in `_layouts/` directory
- Update includes in `_includes/` directory

### Adding Features
- **Comments**: Use Disqus or GitHub Issues
- **Analytics**: Add Google Analytics to `_includes/head.html`
- **Search**: Implement with lunr.js or Algolia

## Maintenance Tips

### Regular Updates
```bash
# Pull latest changes
git pull origin main

# Add new post
# Create file in _posts/

# Commit and push
git add .
git commit -m "Add new post: [title]"
git push origin main
```

### Backup Strategy
- Keep your repository regularly updated
- Consider using branches for major changes
- Test locally before pushing to main

## Troubleshooting

### Common Issues:

1. **Site not building**: Check `_config.yml` syntax
2. **Posts not showing**: Verify date format and front matter
3. **Styling issues**: Check CSS file paths and Tailwind CDN
4. **Images not loading**: Use absolute URLs or proper relative paths

### Build Logs
Check GitHub Actions tab in your repository for build logs and errors.

## Next Steps

Once your blog is running:

1. **Write more posts** regularly
2. **Customize the design** to match your style  
3. **Add social sharing** buttons
4. **Implement SEO** best practices
5. **Add RSS feed** (already included with jekyll-feed plugin)
6. **Set up Google Analytics**
7. **Create a sitemap** (already included with jekyll-sitemap plugin)
