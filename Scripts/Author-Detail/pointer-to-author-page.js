document.addEventListener('click', function(e) {
    // Prevent conflict if clicking a book inside an author card
    if (e.target.closest('.jstoBookDetailPage')) {
        return; 
    }
    
    const targetButton = e.target.closest('.jstoAuthorPage');

    if (targetButton) {
        e.preventDefault(); 
        
        // Get ID from data attribute (support both conventions)
        const authorId = targetButton.dataset.authorId || targetButton.dataset.id;
        
        if (authorId) {
            console.log("Navigating to Author ID:", authorId);

            // Determine path based on current location (Root vs Details folder)
            const isInDetails = window.location.pathname.includes('/Details/');
            const targetUrl = isInDetails ? `./author.html?id=${authorId}` : `./Details/author.html?id=${authorId}`;
            
            window.location.href = targetUrl;
        } else {
            console.warn("No author ID found on element");
        }
    }
});