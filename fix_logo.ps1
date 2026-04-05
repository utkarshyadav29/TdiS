$html = Get-Content 'index.html' -Raw
if ($html -match 'src="(data:image/png;base64,[^"]+)"') {
    $b64src = $Matches[1]
    $about = Get-Content 'about/index.html' -Raw
    $about = $about.Replace('../assets/images/tdis-logo.png', $b64src)
    Set-Content 'about/index.html' $about -NoNewline
    Write-Host "Logo replaced successfully (length: $($b64src.Length))"
} else {
    Write-Host "Base64 not found in index.html"
}
