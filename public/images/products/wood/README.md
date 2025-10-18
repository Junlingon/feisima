# WOOD 产品图片目录

这个目录用于存放木制产品的图片。

## 图片命名规范

- 主图片: `wood-[序号].jpg`
- 缩略图: `wood-[序号]-thumb.jpg`
- 大图: `wood-[序号]-large.jpg`

## 从PDF提取图片

要从PDF文件中提取真实的产品图片，请运行：

```bash
npm run extract-images
```

这将从 `assets/pdfs/` 目录中的PDF文件提取图片并保存到此目录。

## 手动添加图片

您也可以手动将产品图片放置在此目录中，确保遵循上述命名规范。
