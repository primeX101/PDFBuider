/**
 * Rich content data for all Paperly tools.
 * Each tool has: title, metaDescription, longDescription, howTo steps, and FAQs.
 * This content satisfies AdSense "publisher content" requirements per tool page.
 */

export const toolContent = {
  merge: {
    title: 'Merge PDF Files Online — Combine Multiple PDFs Into One',
    metaDescription: 'Combine two or more PDF documents into a single file instantly. Paperly merges PDFs right in your browser — no uploads, no servers, completely private.',
    longDescription: `Merging PDF files is one of the most common document tasks in any workflow. Whether you are assembling a report from several chapters, combining scanned receipts for an expense claim, or bundling contract appendices into a single package, Paperly's Merge PDF tool makes the process effortless.

Unlike cloud-based services that require you to upload sensitive documents to a remote server, Paperly processes everything locally inside your web browser. Your files never leave your device, which means confidential financial statements, legal agreements, and personal records stay completely private throughout the merge.

Simply drag and drop your PDF files into the workspace, arrange them in the order you want, and click "Process and download." Paperly reads the internal structure of each PDF — preserving fonts, images, vector graphics, annotations, and bookmarks — then writes a brand-new combined document. The result is a clean, standards-compliant PDF that opens reliably in any viewer.

There is no software to install, no account to create, and no file-size cap enforced by a server. Because the work happens on your own hardware, performance scales with your machine. Most merges of ten or fewer documents complete in under two seconds.`,
    howTo: [
      'Open the Merge PDF tool and click "Add files" or drag your PDF documents into the workspace.',
      'Add all the PDFs you want to combine. They will appear in the file list in the order you added them.',
      'Review the file order. The final merged document will follow this sequence from first page to last.',
      'Click "Process and download." Paperly will combine all selected files and automatically download the merged PDF.',
    ],
    faqs: [
      { q: 'Is there a file size limit for merging?', a: 'There is no server-enforced size limit because processing happens entirely in your browser. Practical limits depend on your device\'s available memory. Most modern computers handle combined files up to several hundred megabytes without difficulty.' },
      { q: 'Does merging preserve formatting and images?', a: 'Yes. Paperly reads and re-assembles the internal PDF structure, so fonts, images, vector graphics, annotations, and page layouts are preserved exactly as they appear in the originals.' },
      { q: 'Can I change the page order after merging?', a: 'You can use the Reorder Pages tool after merging to rearrange individual pages within the combined document. Alternatively, reorder the files before you merge.' },
      { q: 'Are my files uploaded to a server?', a: 'No. All processing happens locally in your browser using JavaScript. Your documents never leave your device, and nothing is stored on any remote server.' },
      { q: 'What browsers are supported?', a: 'Paperly works in all modern browsers including Chrome, Firefox, Edge, and Safari. We recommend using the latest version for the best performance.' },
    ],
  },

  split: {
    title: 'Split PDF Pages Online — Extract Selected Pages From a PDF',
    metaDescription: 'Extract specific pages or page ranges from any PDF document. Paperly splits PDFs in your browser — fast, free, and completely private.',
    longDescription: `Need to pull a single chapter out of a long report, or extract just the signature page from a contract? Paperly's Split PDF tool lets you specify exactly which pages you want, and creates a new document containing only those pages.

This is invaluable for professionals who receive large combined documents but only need a subset. Accountants can extract quarterly summaries from annual reports. Lawyers can isolate exhibit pages from case files. Students can pull out specific lecture slides from a semester-long deck.

Paperly's splitting engine respects the internal structure of your PDF, so extracted pages retain their original formatting, embedded fonts, images, and even interactive form fields. You specify pages using intuitive range notation — for example, "1-3, 7, 12-15" — and the tool does the rest.

Because processing runs entirely in your browser, there are no upload queues, no waiting for a server to respond, and no privacy concerns. The original file is never modified; instead, a brand-new PDF containing your chosen pages is generated and downloaded.`,
    howTo: [
      'Open the Split PDF tool and upload your PDF document by clicking "Add files" or dragging the file into the workspace.',
      'Enter the page numbers or ranges you want to extract in the "Page range" field (e.g., "1-3, 5, 8-10").',
      'Check the total page count displayed to ensure your range is valid.',
      'Click "Process and download." A new PDF containing only the specified pages will be saved to your device.',
    ],
    faqs: [
      { q: 'How do I specify which pages to extract?', a: 'Use comma-separated page numbers and ranges. For example, "1-3, 5, 8-10" extracts pages 1 through 3, page 5, and pages 8 through 10. Pages are numbered starting from 1.' },
      { q: 'Does splitting alter the original file?', a: 'No. The original PDF is never modified. Paperly creates a brand-new document containing only the pages you selected.' },
      { q: 'Can I split a password-protected PDF?', a: 'If the PDF requires a password to open, you will need to enter it first. PDFs with print/copy restrictions (owner password) can usually be processed without issues.' },
      { q: 'Is there a limit on how many pages I can extract?', a: 'No artificial limit. You can extract as many or as few pages as you need, up to the total number of pages in the original document.' },
    ],
  },

  rotate: {
    title: 'Rotate PDF Pages Online — Turn Pages in Any Direction',
    metaDescription: 'Rotate PDF pages by 90°, 180°, or 270° with one click. Fix sideways scans and upside-down pages right in your browser — free and private.',
    longDescription: `Scanned documents, faxed receipts, and camera-captured pages often end up rotated the wrong way. Paperly's Rotate PDF tool lets you correct page orientation in seconds, saving you from the frustration of reading sideways or upside-down text.

You can rotate all pages in a document by 90° clockwise, 180° (flipping upside-down pages right-side up), or 270° clockwise (equivalent to 90° counter-clockwise). This is especially useful when preparing scanned documents for archival, sharing with colleagues, or printing.

The rotation is applied to the PDF page object itself, not just the visual display. This means the corrected orientation will appear in every PDF viewer, print queue, and digital archive that opens the file. Text, images, annotations, and form fields all rotate together seamlessly.

Like all Paperly tools, rotation happens entirely within your browser. The corrected file is generated locally and downloaded directly to your device. No data is sent to any external server, making this tool ideal for handling confidential medical records, legal filings, or financial documents that require strict privacy.`,
    howTo: [
      'Open the Rotate PDF tool and upload the PDF file that needs rotation.',
      'Select the desired rotation angle from the dropdown menu: 90° clockwise, 180°, or 270° clockwise.',
      'Click "Process and download." The rotated PDF will be saved to your device immediately.',
    ],
    faqs: [
      { q: 'Can I rotate individual pages instead of the entire document?', a: 'Currently the Rotate tool applies the same rotation to all pages. To rotate only specific pages, you can split those pages out first, rotate them, and then merge the document back together.' },
      { q: 'Will rotation affect text searchability?', a: 'No. The text layer is rotated along with the visual content, so searchability, copy-paste, and accessibility features are fully preserved.' },
      { q: 'Does rotation change the file size?', a: 'Rotation changes only the page orientation metadata and has negligible impact on file size. Your rotated PDF will be approximately the same size as the original.' },
    ],
  },

  delete: {
    title: 'Delete PDF Pages Online — Remove Unwanted Pages Instantly',
    metaDescription: 'Remove specific pages from any PDF document without affecting the rest. Paperly deletes pages in your browser — private and free, no sign-up needed.',
    longDescription: `Sometimes you need to remove blank pages, outdated sections, or confidential information from a PDF before sharing it. Paperly's Delete Pages tool lets you specify exactly which pages to remove, then generates a clean new document with those pages excluded.

This tool is perfect for cleaning up scanned documents that include blank separator sheets, removing cover pages from reports before distributing the core content, or stripping test pages from final deliverables. It is also useful for redacting entire pages that contain sensitive information you do not want to share.

You specify pages to remove using the same intuitive notation used in the Split tool — for example, "2, 4-6" removes page 2 and pages 4 through 6. The remaining pages are renumbered automatically and assembled into a new PDF that retains all the original formatting, fonts, images, and metadata of the kept pages.

Since the processing is done entirely in your browser, you can confidently delete pages from sensitive documents such as medical records, financial statements, or legal contracts without worrying about privacy. No data leaves your device at any point during the operation.`,
    howTo: [
      'Open the Delete Pages tool and upload the PDF file you want to edit.',
      'Enter the page numbers or ranges to remove in the "Pages to delete" field (e.g., "2, 4-6").',
      'Click "Process and download." A new PDF without the specified pages will be saved to your device.',
    ],
    faqs: [
      { q: 'Can I undo a deletion?', a: 'The original file is never modified. Paperly creates a new document with the selected pages removed. You can always go back to your original file if you need to start over.' },
      { q: 'What happens to page numbers after deletion?', a: 'The remaining pages are automatically renumbered sequentially in the output file. If the original PDF had custom page labels, those may be affected.' },
      { q: 'Can I delete all pages except certain ones?', a: 'If you want to keep only specific pages, the Split tool is a better fit — it lets you specify which pages to extract rather than which to remove.' },
    ],
  },

  reorder: {
    title: 'Reorder PDF Pages Online — Rearrange Pages Your Way',
    metaDescription: 'Rearrange pages within any PDF document by specifying your preferred order. Paperly reorders pages in your browser — fast, free, and private.',
    longDescription: `When assembling documents from multiple sources or reorganizing a report for a different audience, you often need to rearrange the page sequence. Paperly's Reorder Pages tool lets you define exactly the order you want, then generates a new PDF with pages arranged accordingly.

This tool is especially helpful for presentations where you want to move the executive summary to the front, proposals where appendices need reordering, or educational materials where chapters should follow a different curriculum sequence. Instead of manually cutting and pasting in a PDF editor, you simply type the new page order.

You specify the desired sequence as a comma-separated list of page numbers — for example, "3, 1, 2, 4" moves page 3 to the front, followed by pages 1, 2, and 4. You can even repeat page numbers to duplicate pages within the output, or omit pages to exclude them.

Paperly reads the complete page structure — text, graphics, annotations, and metadata — and reassembles the document in your specified order. The result is a valid, standards-compliant PDF that works in any viewer. All processing happens locally in your browser with no file uploads or server interaction.`,
    howTo: [
      'Open the Reorder Pages tool and upload the PDF you want to rearrange.',
      'Note the total page count displayed in the interface.',
      'Type your desired page order in the "New page order" field as comma-separated numbers (e.g., "3, 1, 2, 4").',
      'Click "Process and download." The rearranged PDF will be generated and downloaded instantly.',
    ],
    faqs: [
      { q: 'Can I duplicate a page by listing it more than once?', a: 'Yes. If you type "1, 1, 2, 3" the output will have page 1 appearing twice, followed by pages 2 and 3.' },
      { q: 'What if I leave out a page number?', a: 'Any page number not included in your list will be omitted from the output. This effectively combines reordering with selective page deletion.' },
      { q: 'Is the original file modified?', a: 'No. A brand-new PDF is created with your specified page order. The original document remains unchanged on your device.' },
    ],
  },

  compress: {
    title: 'Compress PDF Online — Reduce PDF File Size',
    metaDescription: 'Shrink PDF file size by optimizing internal objects and removing redundancies. Paperly compresses PDFs in your browser — free, fast, and private.',
    longDescription: `Large PDF files are difficult to email, slow to upload, and consume excessive storage space. Paperly's Compress PDF tool reduces file size by optimizing the internal object structure of your document, removing redundant data, and streamlining the PDF for efficient storage and sharing.

The compression process analyzes duplicate objects, cleans up unused resources, and rebuilds the document tree to eliminate bloat. Unlike lossy compression services that degrade image quality or downsample graphics, Paperly focuses on structural optimization that preserves the visual fidelity of text, vector artwork, and embedded fonts.

This tool is particularly useful after merging multiple documents (which can introduce duplicate font subsets), after scanning (which often produces oversized files), or when preparing documents for email where attachment size limits apply. Government agencies, law firms, and financial institutions that handle high volumes of PDF documents find compression essential for managing storage costs and transmission times.

The entire compression process runs in your browser. Your document is never uploaded to any server, ensuring that confidential contracts, proprietary reports, and personal records remain completely private. The compressed output is downloaded directly to your device.`,
    howTo: [
      'Open the Compress PDF tool and upload the PDF file you want to shrink.',
      'Click "Process and download." Paperly will analyze and optimize the document structure automatically.',
      'The compressed PDF will be downloaded. Compare the original and compressed file sizes to see the reduction.',
    ],
    faqs: [
      { q: 'How much can I expect the file size to shrink?', a: 'Results vary depending on the document. PDFs with duplicate fonts, unused objects, or redundant metadata may see significant reductions. Highly optimized PDFs may see little change. Typical reductions range from 10% to 60%.' },
      { q: 'Does compression reduce image quality?', a: 'Paperly focuses on structural optimization — removing duplicate objects and streamlining the PDF internals. It does not downsample or re-encode images, so visual quality is preserved.' },
      { q: 'Can compression break my PDF?', a: 'No. The output is a valid, standards-compliant PDF. All text, images, fonts, and interactive elements are preserved. Only redundant internal data is removed.' },
      { q: 'Is there a file size limit?', a: 'No server-side limit. Processing happens in your browser, so the practical limit depends on your device\'s memory. Most PDFs under 200 MB compress without issues on modern computers.' },
    ],
  },

  watermark: {
    title: 'Add Watermark to PDF Online — Stamp Text on Every Page',
    metaDescription: 'Add a custom text watermark to every page of your PDF. Paperly stamps documents in your browser — private, fast, and free.',
    longDescription: `Watermarking is essential for protecting intellectual property, marking documents as drafts, or labeling files as confidential. Paperly's Watermark PDF tool adds a customizable text stamp diagonally across every page of your document, making it immediately clear that the content is protected or preliminary.

Common use cases include marking draft versions of contracts to prevent them from being mistaken for final agreements, stamping "CONFIDENTIAL" on sensitive financial reports before internal distribution, branding presentation handouts with a company name, or labeling sample materials with "NOT FOR DISTRIBUTION."

You type the watermark text — anything from a single word like "DRAFT" to a short phrase — and Paperly renders it as a semi-transparent overlay on each page. The watermark is embedded directly into the PDF structure as drawn text, not as a separate layer, which means it appears consistently in every viewer, in print, and in screenshots.

The original content beneath the watermark remains fully legible, and all existing text, images, and annotations are preserved. The tool processes your document entirely within your browser, ensuring that sensitive files never leave your device.`,
    howTo: [
      'Open the Watermark PDF tool and upload the PDF document you want to watermark.',
      'Type your desired watermark text in the "Watermark text" field (e.g., "CONFIDENTIAL", "DRAFT", "SAMPLE").',
      'Click "Process and download." Every page in the document will receive the watermark overlay.',
      'The watermarked PDF is downloaded directly to your device.',
    ],
    faqs: [
      { q: 'Can I customize the watermark appearance?', a: 'Currently the watermark is rendered as semi-transparent diagonal text across each page. The text content is fully customizable. Additional styling options such as color, opacity, and position may be added in future updates.' },
      { q: 'Will the watermark cover existing text?', a: 'The watermark is semi-transparent and positioned diagonally, so the underlying content remains readable. It serves as a visual indicator without obscuring the document.' },
      { q: 'Can I remove a watermark after adding it?', a: 'Watermarks applied by Paperly are embedded in the page content. To get an unwatermarked version, simply use the original file before watermarking.' },
      { q: 'Does watermarking change the file size significantly?', a: 'Watermarks are text-based and add very little to the file size — typically just a few kilobytes regardless of the number of pages.' },
    ],
  },

  sign: {
    title: 'Sign PDF Online — Add a Typed Signature to Your Document',
    metaDescription: 'Add a typed signature to any page of your PDF document. Paperly signs PDFs in your browser — no uploads, no accounts, completely private.',
    longDescription: `Adding a signature to a PDF is a common requirement for approvals, acknowledgements, and informal agreements. Paperly's Sign PDF tool lets you place a typed signature at a specific position on any page of your document, creating a professional-looking signed copy in seconds.

While this is not a cryptographic digital signature (which requires certificate infrastructure), a typed signature is widely accepted for internal approvals, informal agreements, time sheets, and many routine business documents. It is also useful for adding your name to forms, acknowledgement letters, and consent documents.

You simply enter the name to display as the signature, choose which page it should appear on, and specify the X and Y coordinates for placement. Paperly renders the signature text in a professional style directly onto the PDF page, creating a permanent, visible mark.

The signed document is generated entirely in your browser, which makes it safe for signing confidential documents such as NDAs, employment contracts, and financial authorizations. The original file is not modified — a new signed copy is created and downloaded to your device.`,
    howTo: [
      'Open the Sign PDF tool and upload the document you need to sign.',
      'Enter the signature name in the "Signature name" field.',
      'Specify the page number where the signature should appear.',
      'Set the X and Y position coordinates (in points) to place the signature precisely.',
      'Click "Process and download." The signed PDF will be downloaded to your device.',
    ],
    faqs: [
      { q: 'Is this a legally binding digital signature?', a: 'This tool adds a typed text signature to the document. It is not a cryptographic digital signature with certificate validation. For legally binding electronic signatures, consult your jurisdiction\'s requirements.' },
      { q: 'Can I sign multiple pages?', a: 'Currently the signature is placed on the page number you specify. To sign multiple pages, you can process the document multiple times or use a PDF editor for multi-page signatures.' },
      { q: 'How do I find the right X/Y position?', a: 'Coordinates are measured in points (1 point = 1/72 inch) from the bottom-left corner of the page. A standard letter page is 612 × 792 points. Start with approximate values and adjust as needed.' },
    ],
  },

  'pdf-word': {
    title: 'Convert PDF to Word Online — Transform PDFs Into Editable DOCX',
    metaDescription: 'Convert PDF documents to editable Word (.docx) files with preserved formatting and headings. Paperly converts in your browser — fast, free, and private.',
    longDescription: `Converting a PDF to an editable Word document is one of the most requested document transformations. Whether you need to revise a report that was shared as a PDF, extract structured text from a finalized proposal, or repurpose content from a PDF into a new document, Paperly's PDF to Word converter makes the transition smooth.

Paperly extracts the text content from your PDF, analyzes the structure to identify headings, paragraphs, and sections, then builds a properly formatted DOCX file with appropriate heading levels, paragraph spacing, and text styling. The result is a Word document that you can open in Microsoft Word, Google Docs, or LibreOffice and immediately start editing.

The conversion focuses on text fidelity — ensuring that every word from the original PDF appears in the Word output in the correct order and structure. For documents with complex layouts, multi-column formats, or heavily image-based content, some manual adjustments may be needed after conversion.

All processing occurs within your browser. The PDF text is extracted and the Word document is assembled using client-side libraries, so your confidential documents, contracts, and proprietary materials never leave your device.`,
    howTo: [
      'Open the PDF to Word tool and upload the PDF file you want to convert.',
      'Click "Process and download." Paperly will extract the text and build a structured DOCX file.',
      'Open the downloaded .docx file in Microsoft Word, Google Docs, or any compatible word processor.',
      'Review and edit the document as needed. Headings and paragraph structure should be preserved.',
    ],
    faqs: [
      { q: 'Will the Word document look exactly like the PDF?', a: 'Paperly preserves text content and structural hierarchy (headings, paragraphs). Complex visual layouts, exact font matching, and embedded images may require manual adjustment in the Word output.' },
      { q: 'Can I convert scanned PDFs to Word?', a: 'Scanned PDFs contain images rather than selectable text. Use the OCR tool first to extract text from scanned pages, then convert to Word for the best results.' },
      { q: 'What about tables and lists in the PDF?', a: 'Text-based tables and lists are extracted as structured text. Complex table layouts may appear as plain text paragraphs and might need reformatting in the Word document.' },
      { q: 'Is the conversion private?', a: 'Completely. The conversion happens locally in your browser using JavaScript libraries. No data is sent to any server at any point.' },
    ],
  },

  'pdf-excel': {
    title: 'Convert PDF to Excel Online — Export PDF Data to Spreadsheets',
    metaDescription: 'Extract text and data from PDF documents into Excel (.xlsx) workbooks. Paperly converts locally in your browser — private and free.',
    longDescription: `Financial reports, invoices, inventory lists, and data tables are often locked inside PDF files, making it difficult to analyze or manipulate the data. Paperly's PDF to Excel tool extracts text content from your PDF and organizes it into a spreadsheet format that you can open in Microsoft Excel, Google Sheets, or any compatible application.

The tool reads the selectable text from each page of your PDF and exports it into rows within an Excel workbook. This is particularly useful for extracting tabular data from bank statements, converting price lists into sortable spreadsheets, pulling survey results out of PDF reports, or preparing financial data for further analysis.

For best results, use this tool with PDFs that contain structured, text-based content. Documents with clearly formatted tables will produce the most useful Excel output. Heavily image-based PDFs or documents with complex multi-column layouts may require additional formatting after conversion.

Like all Paperly tools, the conversion runs entirely in your browser. Your financial documents, proprietary data, and sensitive information never leave your device. The resulting Excel file is generated locally and downloaded directly to your computer.`,
    howTo: [
      'Open the PDF to Excel tool and upload the PDF containing the data you want to extract.',
      'Click "Process and download." Paperly will extract text from each page and build an Excel workbook.',
      'Open the downloaded .xlsx file in Microsoft Excel, Google Sheets, or your preferred spreadsheet application.',
      'Review the extracted data and apply any additional formatting or formulas as needed.',
    ],
    faqs: [
      { q: 'Will my tables be properly structured in Excel?', a: 'Paperly extracts text content and organizes it into rows. Clearly structured tabular data tends to convert well, but complex layouts may need manual adjustment in the spreadsheet.' },
      { q: 'Can I convert scanned PDF tables to Excel?', a: 'Scanned PDFs require OCR first. Use Paperly\'s OCR tool to extract text, then convert the recognized text to Excel format.' },
      { q: 'Is there a page limit for conversion?', a: 'No. All pages in the PDF are processed. Longer documents may take a few extra seconds depending on your device\'s performance.' },
    ],
  },

  'pdf-ppt': {
    title: 'Convert PDF to PowerPoint Online — Turn PDFs Into Presentation Slides',
    metaDescription: 'Convert PDF documents into PowerPoint (.pptx) presentations with one click. Paperly converts locally in your browser — fast, free, and private.',
    longDescription: `Repurposing PDF content into presentations is a common need in business, education, and research settings. Paperly's PDF to PowerPoint tool converts each page of your PDF into a slide, extracting the text content so you can edit and enhance it in Microsoft PowerPoint, Google Slides, or Keynote.

This tool is ideal for converting PDF reports into presentation decks for meetings, transforming research papers into lecture slides, or turning document summaries into visual briefings. Each page of the source PDF becomes a separate slide in the output, with the extracted text placed as editable content.

The conversion focuses on preserving text content across slides. You may want to add visual elements, adjust layouts, and apply your presentation theme after conversion. This tool serves as a fast starting point that eliminates the tedious work of manually copying text from a PDF into a slide deck.

Processing happens entirely within your browser. Whether you are converting a confidential business plan, a proprietary research report, or an internal strategy document, your files remain on your device throughout the entire process.`,
    howTo: [
      'Open the PDF to PowerPoint tool and upload the PDF you want to convert.',
      'Click "Process and download." Each PDF page will become a slide in the output.',
      'Open the downloaded .pptx file in PowerPoint, Google Slides, or Keynote.',
      'Edit the slides — adjust layouts, add images, and apply your presentation theme.',
    ],
    faqs: [
      { q: 'Does each PDF page become one slide?', a: 'Yes. Each page in the source PDF is converted into a separate slide in the PowerPoint file, with the page\'s text content placed on the slide.' },
      { q: 'Are images from the PDF included in the slides?', a: 'Currently the tool extracts text content. Images from the PDF are not transferred to the slides. You can add images manually in your presentation software.' },
      { q: 'Can I convert a large PDF with many pages?', a: 'Yes. There is no page limit. Longer documents will produce more slides and may take slightly longer to process, but the tool handles documents of any length.' },
    ],
  },

  'pdf-jpg': {
    title: 'Convert PDF to JPG Online — Render PDF Pages as Images',
    metaDescription: 'Convert each page of a PDF into a high-quality JPG image. Paperly renders pages in your browser — fast, free, and completely private.',
    longDescription: `There are many situations where you need PDF pages as images — embedding them in a website, including them in a presentation, posting on social media, or creating thumbnails for a document library. Paperly's PDF to JPG tool renders each page of your PDF as a high-quality JPEG image.

The tool uses a browser-based PDF rendering engine to accurately reproduce each page, including text, graphics, photos, charts, and decorative elements. The output images are faithful representations of how the pages appear when viewed in a standard PDF reader.

This conversion is particularly useful for web developers who need to display PDF content in image format, social media managers who want to share document excerpts as visual posts, archivists creating image-based records of documents, and anyone who needs a quick visual snapshot of PDF content.

If your PDF has multiple pages, each page is rendered as a separate JPG file, packaged together in a ZIP archive for convenient download. Single-page PDFs produce a single JPG file. All rendering happens locally in your browser — your documents are never transmitted to any external server.`,
    howTo: [
      'Open the PDF to JPG tool and upload the PDF file you want to convert.',
      'Click "Process and download." Each page will be rendered as a high-quality JPG image.',
      'For multi-page PDFs, the images are packaged in a ZIP file. Extract the ZIP to access individual page images.',
      'Use the JPG files in your website, presentation, social media posts, or any other application.',
    ],
    faqs: [
      { q: 'What resolution are the output images?', a: 'Pages are rendered at a standard screen resolution that balances quality and file size. The images are suitable for on-screen viewing, web use, and standard printing.' },
      { q: 'Can I convert just specific pages to images?', a: 'Use the Split tool first to extract the pages you want, then convert the resulting PDF to JPG. This gives you complete control over which pages become images.' },
      { q: 'What if my PDF has only one page?', a: 'Single-page PDFs produce a single JPG file that is downloaded directly, without a ZIP wrapper.' },
      { q: 'Are transparent backgrounds supported?', a: 'JPG format does not support transparency. Pages with transparent elements will be rendered against a white background.' },
    ],
  },

  'word-pdf': {
    title: 'Convert Word to PDF Online — Create a PDF From a DOCX File',
    metaDescription: 'Convert Microsoft Word (.docx) documents to PDF format instantly. Paperly converts locally in your browser — no uploads, no servers, completely private.',
    longDescription: `PDF is the universal format for sharing documents that need to look the same everywhere, regardless of the recipient's software or operating system. Paperly's Word to PDF tool converts your Microsoft Word (.docx) files into clean, professional PDF documents ready for distribution, archival, or printing.

This tool is essential when finalizing reports, proposals, or contracts that were drafted in Word but need to be shared in a non-editable, universally readable format. Converting to PDF ensures that your formatting, fonts, and layout appear exactly as intended, even on devices that don't have Microsoft Word installed.

Paperly reads the DOCX file structure — including paragraphs, headings, and text formatting — and renders it into a well-structured PDF. The result is a standards-compliant document that opens reliably in any PDF viewer, from Adobe Acrobat to web browsers.

The conversion runs entirely in your browser using client-side libraries, which means your Word documents — whether they contain confidential business plans, legal drafts, or personal letters — never leave your device. No account is required, and there are no conversion limits or watermarks on the output.`,
    howTo: [
      'Open the Word to PDF tool and upload your .docx file by clicking "Add files" or dragging the file in.',
      'Click "Process and download." Paperly will read the Word document and generate a PDF.',
      'The PDF will be downloaded automatically. Open it in any PDF viewer to verify the result.',
    ],
    faqs: [
      { q: 'Does the PDF preserve my Word formatting?', a: 'Paperly preserves paragraph structure, headings, and text formatting. Complex elements like tracked changes, comments, and advanced layout features may not transfer perfectly.' },
      { q: 'Can I convert .doc files (older Word format)?', a: 'Currently Paperly supports .docx format (Word 2007 and later). If you have an older .doc file, open it in Word first and save as .docx before converting.' },
      { q: 'Is there a watermark on the output?', a: 'No. Paperly does not add any watermarks, logos, or branding to your converted documents. The output is a clean PDF.' },
    ],
  },

  'excel-pdf': {
    title: 'Convert Excel to PDF Online — Export Spreadsheets to PDF',
    metaDescription: 'Convert Excel (.xlsx) and CSV spreadsheets to PDF documents. Paperly converts locally in your browser — fast, free, and private.',
    longDescription: `Sharing spreadsheet data often requires converting it to PDF format to ensure the recipient sees the data exactly as you intend, without the ability to accidentally modify cells or formulas. Paperly's Excel to PDF tool converts your spreadsheet files into well-formatted PDF documents.

This tool is valuable for financial teams distributing quarterly reports, HR departments sharing compensation summaries, project managers issuing status reports, and anyone who needs to present tabular data in a fixed, professional format. PDF ensures that column widths, row heights, and data alignment look consistent across every device and print output.

Paperly supports .xlsx (Microsoft Excel), .xls (legacy Excel), and .csv (comma-separated values) formats. The tool reads the spreadsheet data and renders it into a structured PDF layout. For best results, ensure your spreadsheet is well-organized before conversion.

All processing happens in your browser — your financial data, employee records, and business metrics never leave your device. The conversion is instant and requires no account or software installation.`,
    howTo: [
      'Open the Excel to PDF tool and upload your spreadsheet file (.xlsx, .xls, or .csv).',
      'Click "Process and download." Paperly will read the spreadsheet and generate a formatted PDF.',
      'The PDF will be downloaded automatically. Open it to review the converted data.',
    ],
    faqs: [
      { q: 'Does the conversion preserve formulas?', a: 'PDF is a static format, so formulas are not preserved. The calculated values (results) are included in the PDF, but the formulas themselves are not.' },
      { q: 'Can I convert CSV files?', a: 'Yes. Paperly accepts .xlsx, .xls, and .csv files for conversion to PDF.' },
      { q: 'What about charts and graphs in my spreadsheet?', a: 'Currently the tool focuses on tabular data extraction. Charts and embedded graphics may not be included in the PDF output.' },
    ],
  },

  'ppt-pdf': {
    title: 'Convert PowerPoint to PDF Online — Export Slides to PDF',
    metaDescription: 'Convert PowerPoint (.pptx) presentations to PDF documents. Paperly converts locally in your browser — fast, free, and private.',
    longDescription: `Sharing presentations outside your organization often requires converting them to PDF to ensure they display correctly regardless of the recipient's software. Paperly's PowerPoint to PDF tool converts your .pptx slide decks into professional PDF documents that anyone can view.

This tool is essential for distributing presentation handouts at conferences, sharing slide content with clients who may not have PowerPoint, archiving presentations in a universally accessible format, or creating printable versions of slide decks for reference.

Paperly reads the text content from each slide in your PowerPoint file and renders it into a structured PDF document. Each slide's text content is preserved, making the output suitable for reading and reference purposes.

The conversion runs entirely in your browser. Whether your presentation contains proprietary business strategies, product roadmaps, or internal research findings, your files stay on your device. There are no uploads, no accounts, and no watermarks on the output.`,
    howTo: [
      'Open the PPT to PDF tool and upload your .pptx file.',
      'Click "Process and download." Paperly will extract slide content and generate a PDF.',
      'The PDF will be downloaded automatically. Each slide\'s text content appears in the document.',
    ],
    faqs: [
      { q: 'Does the PDF preserve slide layouts and images?', a: 'Paperly extracts text content from each slide. Visual elements like background images, charts, and complex layouts may not transfer to the PDF. The focus is on preserving readable text content.' },
      { q: 'Can I convert older .ppt files?', a: 'Currently Paperly supports .pptx format (PowerPoint 2007 and later). For older .ppt files, open them in PowerPoint and save as .pptx first.' },
      { q: 'Is there a slide limit?', a: 'No. Presentations of any length are supported. Larger files may take slightly longer to process.' },
    ],
  },

  summary: {
    title: 'AI Document Summary — Get Key Points From Any PDF',
    metaDescription: 'Generate an executive summary, key points, and keywords from any PDF document using AI. Paperly analyzes documents in your browser — private and free.',
    longDescription: `Reading through long PDF documents to find the main points can be time-consuming, especially when you are reviewing multiple documents under deadline pressure. Paperly's AI Summary tool analyzes the text content of your PDF and generates a concise executive summary, a list of key points, and relevant keyword terms.

This tool is designed for professionals who need to quickly understand the gist of a document without reading every page. Lawyers can get a rapid overview of lengthy contracts, researchers can triage academic papers, managers can review reports before meetings, and students can create study summaries from textbook chapters.

The AI analysis works by extracting the full text from your PDF, identifying the most important passages and themes, and synthesizing them into a structured summary. The output includes an overview paragraph, individually listed key points for quick scanning, and extracted keyword terms that capture the document's subject matter.

Importantly, all analysis happens within your browser. The document text is processed locally using Paperly's built-in intelligence — your files and their contents are never sent to any external API, cloud service, or third-party AI platform. This makes the tool suitable for summarizing confidential documents, proprietary research, and sensitive legal materials.`,
    howTo: [
      'Open the AI Summary tool and upload the PDF document you want to summarize.',
      'Click "Analyze document." Paperly will extract the text and generate a structured summary.',
      'Review the executive overview, key points, and keyword terms in the results panel.',
      'Use the summary for meeting preparation, document triage, or research notes.',
    ],
    faqs: [
      { q: 'How accurate is the AI summary?', a: 'The summary is generated by analyzing text patterns and key phrases in your document. It provides a useful starting point for understanding the content, but we recommend verifying critical details against the original document.' },
      { q: 'Does Paperly send my document to an AI service?', a: 'No. The analysis runs entirely in your browser using local algorithms. No text is sent to OpenAI, Google, or any other external service. Your document remains completely private.' },
      { q: 'Can I summarize scanned PDFs?', a: 'Scanned PDFs contain images rather than selectable text. Use the OCR tool first to extract text from scanned pages, then run the summary on the resulting text-based PDF.' },
      { q: 'Is there a page or word limit?', a: 'There is no hard limit, but very long documents may take more time to process. The tool works best with documents up to a few hundred pages.' },
    ],
  },

  chat: {
    title: 'Chat With Your PDF — Ask Questions About Any Document',
    metaDescription: 'Ask questions about your PDF document and get answers based on its content. Paperly\'s Chat tool works in your browser — private and free.',
    longDescription: `Sometimes you need a specific answer from a long document rather than a broad summary. Paperly's Chat with PDF tool lets you ask natural-language questions about your document and receive targeted answers drawn from the text content.

This tool is perfect for quickly finding specific information buried in lengthy reports, contracts, manuals, or research papers. Instead of manually searching through pages, simply type your question — "What is the payment deadline?", "What are the key risks mentioned?", "What conclusions did the study reach?" — and the tool will search the document text for relevant passages and formulate an answer.

The question-answering system works by extracting all text from your PDF, analyzing it against your question, and identifying the most relevant sections. The answer is synthesized from these sections, giving you a focused response rather than raw search results.

Because the analysis runs entirely in your browser, you can confidently ask questions about confidential contracts, proprietary reports, personal documents, and sensitive data. No text is transmitted to any external service. Your document and your questions remain completely private on your device.`,
    howTo: [
      'Open the Chat with PDF tool and upload the document you want to query.',
      'Type your question in the question field. Be as specific as possible for the best results.',
      'Click "Analyze document." Paperly will search the document text and formulate an answer.',
      'Review the answer in the results panel, along with metadata about the search.',
    ],
    faqs: [
      { q: 'What kinds of questions can I ask?', a: 'You can ask about any factual content within the document — deadlines, names, amounts, conclusions, definitions, risks, and more. The tool works best with specific, targeted questions.' },
      { q: 'Does the tool understand context?', a: 'The tool analyzes the full document text to find relevant passages. It works best with documents that have clear, well-structured text content.' },
      { q: 'Can I ask follow-up questions?', a: 'Yes. Simply update the question field and click "Analyze document" again. Each query is processed independently against the full document text.' },
      { q: 'Is my question sent to a cloud AI?', a: 'No. All processing happens locally in your browser. Neither the document text nor your questions are sent to any external server or AI platform.' },
    ],
  },

  ocr: {
    title: 'OCR PDF — Extract Text From Scanned Documents',
    metaDescription: 'Use optical character recognition to extract readable text from scanned PDF documents and images. Paperly OCR runs in your browser — private and free.',
    longDescription: `Scanned documents, photographed pages, and image-based PDFs contain visual representations of text but lack selectable, searchable text layers. Paperly's OCR (Optical Character Recognition) tool analyzes each page of your scanned PDF and recognizes the text within the images, making it available for copying, searching, and further processing.

This tool is indispensable for digitizing paper documents — converting scanned contracts into searchable files, making photographed receipts machine-readable, extracting data from legacy documents that were archived as images, or enabling accessibility for documents that were previously image-only.

Paperly uses Tesseract.js, a powerful open-source OCR engine that runs entirely in your browser. The engine examines each page image, identifies character shapes, and outputs recognized text with information about character count and page coverage. The recognized text can then be used with other Paperly tools — for example, you can run AI Summary or Chat on OCR-extracted text.

All OCR processing happens locally on your device. Scanned legal documents, medical records, financial statements, and personal correspondence are analyzed without any data leaving your browser. This makes Paperly's OCR suitable for even the most sensitive document digitization tasks.`,
    howTo: [
      'Open the OCR tool and upload the scanned PDF containing image-based pages.',
      'Click "Run OCR." Paperly will analyze each page and recognize the text within.',
      'Review the extracted text in the results panel, along with statistics about pages scanned and characters recognized.',
      'Copy the recognized text or use it with other Paperly tools like AI Summary or Chat.',
    ],
    faqs: [
      { q: 'What languages does OCR support?', a: 'The OCR engine primarily supports English text. Other Latin-script languages may work with varying accuracy. Non-Latin scripts may not be fully supported.' },
      { q: 'How accurate is the text recognition?', a: 'Accuracy depends on the quality of the scan. Clear, high-resolution scans with standard fonts produce the best results. Low-resolution scans, handwriting, or unusual fonts may have lower accuracy.' },
      { q: 'Does OCR work on photographs of documents?', a: 'Yes, as long as the text is legible in the image. For best results, ensure the photograph is well-lit, in focus, and the text is not skewed or distorted.' },
      { q: 'Is the OCR processing done on a server?', a: 'No. Paperly uses Tesseract.js, which runs entirely in your browser. No images or text are sent to any external server.' },
    ],
  },

  compare: {
    title: 'Compare PDF Documents — Find What Changed Between Two PDFs',
    metaDescription: 'Compare two PDF documents to identify differences in their text content. Paperly compares documents in your browser — fast, free, and private.',
    longDescription: `When reviewing document revisions, it is critical to know exactly what changed between versions. Paperly's Compare Documents tool analyzes the text content of two PDF files and highlights the words and phrases that appear in one document but not the other.

This tool is essential for contract negotiations (spotting changes between draft versions), regulatory compliance (comparing policy documents before and after updates), academic reviewing (identifying revisions between paper versions), and quality assurance (verifying that final documents match approved drafts).

The comparison works by extracting the full text from both PDFs, breaking them into individual words, and identifying words that are unique to each document. The results clearly show which terms appear only in the first document and which appear only in the second, giving you a quick overview of the differences.

Both documents are processed entirely in your browser. Whether you are comparing confidential contracts, proprietary specifications, or sensitive reports, neither file's content is transmitted to any external server. The comparison runs locally and the results are displayed immediately in the interface.`,
    howTo: [
      'Open the Compare Documents tool and upload both PDF files you want to compare.',
      'Select both documents in the file picker (checkboxes allow selecting two files).',
      'Click "Analyze document." Paperly will extract text from both PDFs and compare their content.',
      'Review the results showing words unique to each document.',
    ],
    faqs: [
      { q: 'Does the tool show line-by-line differences?', a: 'The current comparison identifies words and phrases unique to each document. It provides a high-level overview of content differences rather than a line-by-line diff.' },
      { q: 'Can I compare more than two documents?', a: 'The Compare tool is designed for two-document comparison. For comparing multiple versions, run separate comparisons between pairs.' },
      { q: 'Does it work with scanned PDFs?', a: 'The comparison requires selectable text. For scanned documents, run OCR first to extract text, then compare the resulting text-based PDFs.' },
    ],
  },

  contract: {
    title: 'Contract Review — Find Risks and Deadlines in Legal Documents',
    metaDescription: 'Automatically scan contracts for risk language, obligation clauses, and important dates. Paperly reviews documents in your browser — private and free.',
    longDescription: `Reviewing contracts for potential risks, obligations, and critical deadlines is a time-intensive but essential task. Paperly's Contract Review tool automates the initial screening by scanning your document for common risk-related language, obligation phrases, and date references.

This tool helps legal professionals, business managers, procurement teams, and freelancers quickly identify areas of a contract that may require closer attention. The review flags phrases related to liability, indemnification, termination, penalties, confidentiality, non-compete clauses, and other common risk areas. It also extracts dates mentioned in the document, helping you track deadlines, renewal dates, and expiration periods.

The review is pattern-based — it searches for well-known contract risk phrases and date formats in the extracted text. While it is not a substitute for professional legal review, it serves as an efficient first pass that can save hours of reading time and ensure that important clauses are not overlooked.

The entire analysis runs within your browser. Contract text is never sent to any external server, making this tool suitable for reviewing confidential agreements, non-disclosure agreements, employment contracts, and vendor agreements.`,
    howTo: [
      'Open the Contract Review tool and upload the PDF contract you want to analyze.',
      'Click "Analyze document." Paperly will scan the text for risk language and date references.',
      'Review the flagged attention areas and extracted dates in the results panel.',
      'Use the findings as a starting point for thorough legal review of the flagged sections.',
    ],
    faqs: [
      { q: 'Does this replace a lawyer\'s review?', a: 'No. This tool provides an automated initial screening based on common risk phrases. It is meant to assist, not replace, professional legal review. Always consult qualified legal counsel for important contracts.' },
      { q: 'What risk phrases does it look for?', a: 'The tool searches for language related to liability, indemnification, termination, penalties, liquidated damages, non-compete clauses, confidentiality obligations, and other common contract risk areas.' },
      { q: 'Can it review contracts in languages other than English?', a: 'Currently the risk-phrase detection is optimized for English-language contracts. Documents in other languages may not produce accurate results.' },
      { q: 'Is my contract text sent to an AI service?', a: 'No. All analysis happens locally in your browser. Your contract text is never transmitted to any external server, API, or AI platform.' },
    ],
  },

  invoice: {
    title: 'Invoice Data Extraction — Pull Key Fields From PDF Invoices',
    metaDescription: 'Automatically extract vendor names, invoice numbers, amounts, and dates from PDF invoices. Paperly processes invoices in your browser — private and free.',
    longDescription: `Processing invoices manually — reading each one to find the vendor name, invoice number, total amount, and due date — is tedious and error-prone, especially when dealing with high volumes. Paperly's Invoice Extraction tool automates this process by scanning your PDF invoice and pulling out the key fields.

The tool is designed for accounts payable teams, bookkeepers, small business owners, and freelancers who need to quickly digitize invoice data for entry into accounting systems, expense reports, or spreadsheets. It identifies and extracts the vendor or supplier name, invoice number, monetary amounts, and relevant dates from the document text.

The extraction uses pattern matching to identify common invoice field formats — currency amounts, date patterns, reference numbers, and business names. It works best with clearly formatted invoices that contain standard field labels such as "Invoice #", "Total", "Date", and "Bill To."

All processing runs in your browser. Whether you are extracting data from supplier invoices, utility bills, or freelance payment requests, the document content stays on your device. No financial data is transmitted to any external server.`,
    howTo: [
      'Open the Invoice Extraction tool and upload the PDF invoice you want to process.',
      'Click "Analyze document." Paperly will scan the invoice text for key data fields.',
      'Review the extracted information: vendor name, invoice number, amounts, and dates.',
      'Use the extracted data for data entry into your accounting system or expense reports.',
    ],
    faqs: [
      { q: 'What fields does the tool extract?', a: 'The tool extracts vendor/supplier name, invoice number, monetary amounts (totals, line items), and dates (invoice date, due date, payment terms).' },
      { q: 'Does it work with all invoice formats?', a: 'The tool works best with clearly formatted invoices that use standard labels. Highly customized or non-standard invoice layouts may produce partial results.' },
      { q: 'Can I process multiple invoices at once?', a: 'Currently the tool processes one invoice at a time. Upload each invoice separately for extraction.' },
      { q: 'Is my financial data safe?', a: 'Completely. All extraction happens in your browser using local pattern matching. No invoice data, amounts, or vendor information is sent to any external server.' },
    ],
  },
};
