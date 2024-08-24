document.addEventListener('DOMContentLoaded', function () {
    const createPostBtn = document.getElementById('createPostBtn');
    const createPostModal = document.getElementById('createPostModal');
    const closeModal = document.getElementById('closeModal');
    const postForm = document.getElementById('postForm');
    const postContainer = document.querySelector('.post-container');
    const postDetailModal = document.getElementById('postDetailModal');
    const closeDetailModal = document.getElementById('closeDetailModal');
    const detailTitle = document.getElementById('detailTitle');
    const detailDate = document.getElementById('detailDate');
    const detailDescription = document.getElementById('detailDescription');
    const editPostBtn = document.getElementById('editPostBtn');
    const deletePostBtn = document.getElementById('deletePostBtn');

    let currentPostElement = null;

    // Open the Create Post Modal
    createPostBtn.addEventListener('click', function () {
        createPostModal.style.display = 'flex';
    });

    // Close the Create Post Modal
    closeModal.addEventListener('click', function () {
        createPostModal.style.display = 'none';
        postForm.reset(); // Reset form fields on modal close
    });

    // Handle Post Form Submission
    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const postCategory = document.getElementById('postCategory').value.trim();
        const postTitle = document.getElementById('postTitle').value.trim();
        const postDescription = document.getElementById('postDescription').value.trim();

        // Validation: Ensure all fields are filled out
        if (postCategory === '' || postTitle === '' || postDescription === '') {
            alert('Please fill out all fields.');
            return;
        }

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;

        const descriptionPreview = postDescription.length > 100 ? postDescription.substring(0, 100) + '...' : postDescription;

        if (currentPostElement) {
            // Update the existing post
            currentPostElement.querySelector('.post-title').textContent = postTitle;
            currentPostElement.querySelector('.category').textContent = postCategory;
            currentPostElement.querySelector('.post-date').textContent = formattedDate;
            currentPostElement.querySelector('.post-description').innerHTML = `
                ${descriptionPreview}
                ${postDescription.length > 100 ? '<a href="#" class="read-more">Read More</a>' : ''}
            `;

            currentPostElement.querySelector('.post-title').setAttribute('data-title', postTitle);
            currentPostElement.querySelector('.post-title').setAttribute('data-date', formattedDate);
            currentPostElement.querySelector('.post-title').setAttribute('data-description', postDescription);
        } else {
            // Create a new post
            const newPost = document.createElement('div');
            newPost.className = 'post-box';
            newPost.innerHTML = `
                <h2 class="post-title" data-title="${postTitle}" data-date="${formattedDate}" data-description="${postDescription}">
                    ${postTitle}
                </h2>
                <h3 class="category">${postCategory}</h3>
                <span class="post-date">${formattedDate}</span>
                <p class="post-description">
                    ${descriptionPreview}
                    ${postDescription.length > 100 ? '<a href="#" class="read-more">Read More</a>' : ''}
                </p>
                <button class="edit-post">Edit</button>
                <button class="delete-post">Delete</button>
            `;

            postContainer.insertBefore(newPost, postContainer.firstChild);
        }

        // Close the modal and reset the form
        createPostModal.style.display = 'none';
        postForm.reset();
        currentPostElement = null;
    });

    // Handle Post Container Click Events
    postContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('post-title')) {
            // Open the post detail modal with full post details
            const postElement = event.target.closest('.post-box');
            detailTitle.textContent = event.target.getAttribute('data-title');
            detailDate.textContent = event.target.getAttribute('data-date');
            detailDescription.textContent = event.target.getAttribute('data-description');
            postDetailModal.style.display = 'flex';
            currentPostElement = postElement;
        }

        if (event.target.classList.contains('edit-post')) {
            // Open the Create Post Modal for Editing
            currentPostElement = event.target.closest('.post-box');
            document.getElementById('postCategory').value = currentPostElement.querySelector('.category').textContent;
            document.getElementById('postTitle').value = currentPostElement.querySelector('.post-title').textContent;
            document.getElementById('postDescription').value = currentPostElement.querySelector('.post-description').textContent;

            createPostModal.style.display = 'flex';
        }

        if (event.target.classList.contains('delete-post')) {
            // Delete the post after confirmation
            if (confirm('Are you sure you want to delete this post?')) {
                event.target.closest('.post-box').remove();
                currentPostElement = null;
            }
        }

        if (event.target.classList.contains('read-more')) {
            event.preventDefault();
            const postElement = event.target.closest('.post-box');
            detailTitle.textContent = postElement.querySelector('.post-title').textContent;
            detailDate.textContent = postElement.querySelector('.post-date').textContent;
            detailDescription.textContent = postElement.querySelector('.post-title').getAttribute('data-description');
            postDetailModal.style.display = 'flex';
        }
    });

    // Close the Post Detail Modal
    closeDetailModal.addEventListener('click', function () {
        postDetailModal.style.display = 'none';
    });

    // Handle the Edit button inside the Post Detail Modal
    editPostBtn.addEventListener('click', function () {
        postDetailModal.style.display = 'none';

        if (currentPostElement) {
            document.getElementById('postCategory').value = currentPostElement.querySelector('.category').textContent;
            document.getElementById('postTitle').value = currentPostElement.querySelector('.post-title').textContent;
            document.getElementById('postDescription').value = currentPostElement.querySelector('.post-description').textContent;

            createPostModal.style.display = 'flex';
        }
    });

    // Handle the Delete button inside the Post Detail Modal
    deletePostBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this post?')) {
            currentPostElement.remove();
            postDetailModal.style.display = 'none';
            currentPostElement = null;
        }
    });
});
