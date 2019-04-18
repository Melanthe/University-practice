class ViewElements {
    
	static hashtagBubble(hashtag) {
        
		const container = document.getElementById('add-photo').querySelector('.hashtags-container');
		let bubble = document.createElement('div');
        
		bubble.classList.add('hashtag-bubble');
		bubble.innerHTML = `
        <span>${hashtag}</span>
        <i class="fas fa-minus"></i>
        `;

		container.appendChild(bubble);
	}
}