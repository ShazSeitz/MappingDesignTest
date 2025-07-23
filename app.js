class CivicEngageApp {
    constructor() {
        this.maxPriorities = 6;
        this.currentPriority = 1;
        this.priorities = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const addPriorityBtn = document.querySelector('.add-priority');
        const submitBtn = document.querySelector('.submit-btn');
        
        addPriorityBtn.addEventListener('click', () => this.addPriority());
        submitBtn.addEventListener('click', () => this.handleSubmit());
    }

    addPriority() {
        if (this.currentPriority > this.maxPriorities) return;

        const priorityText = document.querySelector('textarea').value.trim();
        if (!priorityText) return;

        const priorityItem = document.createElement('div');
        priorityItem.className = 'priority-item';
        priorityItem.setAttribute('draggable', 'true');
        priorityItem.innerHTML = `
            <div class="priority-content">
                <span class="priority-number">${this.currentPriority}.</span>
                <span class="priority-text">${priorityText}</span>
            </div>
            <button class="remove-priority">×</button>
        `;

        document.querySelector('.priority-list').appendChild(priorityItem);
        
        const removeBtn = priorityItem.querySelector('.remove-priority');
        removeBtn.addEventListener('click', () => this.removePriority(priorityItem));

        this.currentPriority++;
        document.querySelector('.counter').textContent = `${this.currentPriority}/${this.maxPriorities}`;
        document.querySelector('textarea').value = '';

        if (this.currentPriority > this.maxPriorities) {
            document.querySelector('.submit-btn').classList.remove('hidden');
        }
    }

    removePriority(item) {
        item.remove();
        this.currentPriority--;
        document.querySelector('.counter').textContent = `${this.currentPriority}/${this.maxPriorities}`;

        if (this.currentPriority <= this.maxPriorities) {
            document.querySelector('.submit-btn').classList.add('hidden');
        }

        const priorities = document.querySelectorAll('.priority-item');
        priorities.forEach((priority, index) => {
            priority.querySelector('.priority-number').textContent = `${index + 1}.`;
        });
    }

    handleSubmit() {
        const priorities = document.querySelectorAll('.priority-item');
        this.priorities = Array.from(priorities).map(priority => priority.querySelector('.priority-text').textContent);
        this.showMappingInterface();
    }

    showMappingInterface() {
        document.querySelector('.mapping-section').classList.remove('hidden');
        this.processPriorityMapping(0);
    }

    processPriorityMapping(index) {
        if (index >= this.priorities.length) return;

        const mappingContainer = document.querySelector('.mapping-container');
        mappingContainer.innerHTML = `
            <div class="mapping-item">
                <p class="user-input">"${this.priorities[index]}"</p>
                <div class="mapping-options">
                    <button class="accept">👍</button>
                    <button class="reject">👎</button>
                </div>
            </div>
        `;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new CivicEngageApp();
});
