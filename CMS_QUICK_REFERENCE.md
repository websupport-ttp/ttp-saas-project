# CMS Quick Reference Card

## 🚀 Quick Start

### Access CMS
1. Login as Admin or Manager
2. Click "Content Manager" in sidebar
3. Or navigate to: `http://localhost:3000/dashboard/admin/cms`

### Create Content
1. Select tab (Hero Slides, Hot Deals, Articles, Reviews)
2. Click "Add New" button
3. Fill form
4. Upload image (optional)
5. Click "Save"
6. Content appears on homepage immediately!

## 📝 Content Types

### Hero Slides
**Purpose**: Homepage carousel slides
**Fields**: Title, Subtitle, Description, Image, CTA Text, CTA Link, Order, Active
**Location**: Homepage hero section

### Hot Deals
**Purpose**: Special offers and promotions
**Fields**: Title, Description, Image, Prices, Category, Dates, Link, Featured, Active
**Location**: Homepage hot deals section

### Articles
**Purpose**: Blog posts and content
**Fields**: Title, Slug, Excerpt, Content (rich text), Image, Category, Tags, Published, Featured
**Location**: Blog section (to be added to homepage)

### Reviews
**Purpose**: Google Business reviews
**Fields**: Auto-synced from Google
**Location**: Testimonials section (to be added to homepage)

## 🎨 Form Tips

### Image Upload
- Drag and drop or click to upload
- Max size: 5MB
- Formats: JPG, PNG, GIF
- Preview before saving
- Click X to remove

### Rich Text Editor
- Use toolbar for formatting
- Bold, italic, underline
- Headers (H1, H2, H3)
- Lists (ordered, unordered)
- Colors and backgrounds
- Links and images
- Clean paste (removes formatting)

### Auto-Features
- **Slug**: Auto-generated from title (editable)
- **Discount**: Auto-calculated from prices
- **Order**: Controls display sequence
- **Featured**: Shows prominently
- **Active**: Controls visibility

## 🔄 Workflow

### Creating a Hero Slide
```
1. CMS → Hero Slides → Add New Slide
2. Title: "Summer Sale 2026"
3. Subtitle: "Up to 50% off all packages"
4. Upload image
5. CTA Text: "Book Now"
6. CTA Link: "/deals"
7. Order: 1
8. Check "Active"
9. Save → Appears on homepage!
```

### Creating a Hot Deal
```
1. CMS → Hot Deals → Add New Deal
2. Title: "Paris Weekend"
3. Description: "3 nights in Paris with breakfast"
4. Upload image
5. Original Price: 1500
6. Discounted Price: 999
7. Category: Package
8. Valid From: Today
9. Valid Until: Next month
10. Check "Active" and "Featured"
11. Save → Appears on homepage!
```

### Writing an Article
```
1. CMS → Articles → Write New Article
2. Title: "Top 10 Travel Tips for 2026"
3. Excerpt: "Essential tips every traveler should know"
4. Content: Use rich text editor
5. Upload featured image
6. Category: Travel Tips
7. Tags: travel, tips, guide, 2026
8. Check "Published" and "Featured"
9. Save → Article is live!
```

## 🎯 Best Practices

### Images
- Use high-quality images (1920x1080 recommended)
- Optimize before upload (compress)
- Use descriptive filenames
- Keep file size under 2MB for faster loading

### Content
- Keep titles short and catchy (under 60 chars)
- Write compelling descriptions
- Use clear CTAs (Call-to-Actions)
- Proofread before publishing
- Use featured toggle for important content

### SEO
- Use descriptive titles
- Write unique excerpts
- Add relevant tags
- Use proper headings in articles
- Include keywords naturally

### Organization
- Use order numbers for slides (1, 2, 3...)
- Set expiry dates for deals
- Archive old content (set inactive)
- Use categories consistently
- Tag articles properly

## 🔧 Troubleshooting

### Image won't upload
- Check file size (max 5MB)
- Check file type (JPG, PNG, GIF only)
- Try a different image
- Refresh page and try again

### Content not showing on homepage
- Check "Active" toggle is ON
- For deals: Check dates are valid
- For articles: Check "Published" is ON
- Refresh homepage (Ctrl+F5)
- Check browser console for errors

### Can't save content
- Check all required fields are filled
- Check you're logged in as Admin/Manager
- Check internet connection
- Try again in a few seconds

### Rich text editor not working
- Refresh the page
- Clear browser cache
- Try a different browser
- Check JavaScript is enabled

## 📊 Content Status

### Hero Slides
- **Active**: Shows on homepage
- **Inactive**: Hidden from homepage
- **Order**: Controls sequence (1, 2, 3...)

### Hot Deals
- **Active**: Shows on homepage
- **Inactive**: Hidden from homepage
- **Featured**: Shows prominently
- **Expired**: Past valid until date

### Articles
- **Published**: Visible to public
- **Draft**: Only visible to admins
- **Featured**: Shows on homepage
- **View Count**: Tracks popularity

## 🎨 Keyboard Shortcuts

### Rich Text Editor
- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+U` - Underline
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+K` - Insert link

### General
- `Ctrl+S` - Save (in forms)
- `Esc` - Close modal/form
- `Tab` - Next field
- `Shift+Tab` - Previous field

## 📞 Support

### Documentation
- `CMS_IMPLEMENTATION_COMPLETE.md` - Technical details
- `CMS_PHASE_2_COMPLETE.md` - Features guide
- `CMS_TESTING_GUIDE.md` - Testing instructions
- `FINAL_IMPLEMENTATION_SUMMARY.md` - Complete overview

### Common Tasks
- **Update homepage hero**: Edit hero slides
- **Add promotion**: Create hot deal
- **Write blog post**: Create article
- **Hide content**: Uncheck "Active"
- **Feature content**: Check "Featured"
- **Reorder slides**: Change order numbers

### API Endpoints
- Hero Slides: `/api/v1/cms/hero-slides`
- Hot Deals: `/api/v1/cms/hot-deals`
- Articles: `/api/v1/cms/articles`
- Reviews: `/api/v1/cms/google-reviews`

## ✅ Checklist

### Before Publishing
- [ ] Content is proofread
- [ ] Images are uploaded
- [ ] Links are working
- [ ] Dates are correct (for deals)
- [ ] Active toggle is ON
- [ ] Preview looks good
- [ ] SEO fields are filled

### After Publishing
- [ ] Check homepage
- [ ] Test on mobile
- [ ] Verify links work
- [ ] Check loading speed
- [ ] Share on social media
- [ ] Monitor analytics

## 🎉 Quick Wins

### Update Homepage in 5 Minutes
1. Login to CMS
2. Edit existing hero slide
3. Change title and image
4. Save
5. Done! Homepage updated

### Create Promotion in 10 Minutes
1. Login to CMS
2. Go to Hot Deals
3. Click Add New Deal
4. Fill form with offer details
5. Upload image
6. Set dates
7. Save
8. Done! Promotion live

### Write Article in 30 Minutes
1. Login to CMS
2. Go to Articles
3. Click Write New Article
4. Write content with rich text editor
5. Upload featured image
6. Add tags and category
7. Publish
8. Done! Article live

---

**Remember**: All changes are immediate. Content appears on homepage as soon as you save!

**Need Help?** Check the documentation files or contact your system administrator.

**Happy Content Managing!** 🚀
