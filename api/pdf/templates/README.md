## Notes on creating release/certification PDF templates

No convenient open-source library existed for Go that would allow easy customization of PDFs from a template. A work-around doing basic text substitution was devised, with PDF templates generated from the following process:

Tools:
* macOS and [OmniGraffle](https://itunes.apple.com/us/app/omnigraffle-7/id1142578753?mt=12)
* RedHat Enterprise Linux 7 (RHEL7) and [qpdf](https://github.com/qpdf/qpdf). On RHEL7, `qpdf` can be installed via `yum install qpdf`

1. Extract single-page PDFs from multi-page SF-86 PDF.
2. Using OmniGraffle, create look-alike forms, starting off with result of PDF import.
3. Adjust layout of form fields as appropriate to accommodate e-signature legalese, etc.
4. Add placeholder text with appropriate font and size and length in the area of the form where text will be substituted.
5. To minimize PDF size, only use Helvetica or Courier fonts. They are part of the PDF standard. Use Courier for the non-signature auto-populated fields, as a monospace type simplifies layout. Use Helvetica to provide visual contrast for the e-signature fields (full name as signature and date). Tab through all the text in the document and make sure no other fonts are in use.
6. By default, when exporting to PDF, OmniGraffle will structure the PDF objects in such a way to make basic text substitution difficult (i.e., it positions every character separately). To avoid this, place holder text should be a number string (e.g., `7777777703`) of the same length as the desired fixed width field. OmniGraffle will position the string as a single text object surrounded by parentheses (e.g., `(7777777703)` and will make simple substitution possible. In a later stage, the number string will be replaced with a self-describing field name (e.g., `(SSN         )`) Use the following table to help identify which number strings are replaced with with self-describing field names.

|  Number string | Self-describing field name |
| :--- | --- |
|  77777777700 | <pre>/SSN        /</pre> |
|  7777777777777777777777777777777777777777777777777777777777777701 | <pre>/FIRST_MIDDLE_LAST                                               /</pre> |
|  7777777702 | <pre>/SIGNED_ON /</pre> |
|  77777777777777777777777777777777777777777777777777777777777777777777777777703 | <pre>/OTHER_NAMES                                                                  /</pre> |
|  77777777777777777777777704 | <pre>/CITY_COUNTRY              /</pre> |
|  777705 | <pre>/STATE /</pre> |
|  7777777706 | <pre>/ZIP_CODE  /</pre> |
|  7777777707 | <pre>/DOB       /</pre> |
|  77777777777777777708 | <pre>/TELEPHONE           /</pre> |
|  7777777777777777777777777777777777777709 | <pre>/STREET_ADDRESS                          /</pre> |

7. Export each OmniGraffle file to PDF as `[file name]-1.pdf` this will help to keep track of each of the following steps.
8. Use `qpdf --qdf [file name]-1.pdf [file name]-2.pdf` to get a text editable file.
9. Open the newly created `[file name]-2.pdf` in a text editor.
10. OmniGraffle will embed a subset of the TrueType font instead of relying on the default PDF fonts. Replace those with equivalent Type1 directives for `Helvetica`, `Helvetica-Bold`, `Helvetica-Oblique`, and `Courier`, adjusting the object IDs in the below example to match your existing document:
```
%% Original object ID: 17 0
17 0 obj
<<
  /BaseFont /Helvetica-Bold
  /Encoding /MacRomanEncoding
  /Subtype /Type1
  /Type /Font
>>
endobj

%% Original object ID: 18 0
18 0 obj
<<
  /BaseFont /Helvetica
  /Encoding /MacRomanEncoding
  /Subtype /Type1
  /Type /Font
>>
endobj

%% Original object ID: 19 0
19 0 obj
<<
  /BaseFont /Helvetica-Oblique
  /Encoding /MacRomanEncoding
  /Subtype /Type1
  /Type /Font
>>
endobj

%% Original object ID: 19 0
19 0 obj
<<
  /BaseFont /Courier
  /Encoding /MacRomanEncoding
  /Subtype /Type1
  /Type /Font
>>
endobj
```
11. Replace number strings field placeholders with their self-describing equivalent (e.g., `SSN`, `FIRST_MIDDLE_LAST`, `DOB`, etc.). Use the table above for reference of which number strings correspond to which self-describing strings. Copy and paste the self-descibing strings between the first and last `/` which includes spaces, this preserves the object and xref byte offsets in the PDF, so we don't have to parse and re-calculate these values at run-time (i.e., field placeholder character length plus trailing space characters should match original character length of number string in OmniGraffle). See `pdf.go` for current list of supported field names and existing template PDFs for how padding works.
12. Run `fix-qdf <[file name]-2.pdf> [new file name]-3.pdf` to renumber the internal PDF objects.
13. Run `qpdf --qdf [file name]-3.pdf [new file name]-4.pdf` again to remove dangling PDF object references (e.g., the embedded fonts that are no longer used).
14. Validate templates with the [3-Heights PDF validator](https://www.pdf-online.com/osa/validate.aspx) or similar.
15. Remove the `-4 ` from the last file generated.
16. When complete, archive the `.graffle` in `api/pdf/graffle` and place the new template `.pdf` in `api/pdf/templates` respectively. Note: if the OmniGraffle file contains an image it will be in the macOS package format (e.g., directory), otherwise it will be a single file.
