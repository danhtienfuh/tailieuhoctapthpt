function createSnowfall() {
    const header = document.querySelector('header');
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    snowContainer.style.position = 'fixed';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100%';
    snowContainer.style.height = '100%';
    snowContainer.style.pointerEvents = 'none';
    snowContainer.style.zIndex = '9999';
    document.body.appendChild(snowContainer);

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Randomize size
        const size = Math.random() * 5 + 1;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Start from header width
        const headerRect = header.getBoundingClientRect();
        const startX = headerRect.left + Math.random() * headerRect.width;
        snowflake.style.left = `${startX}px`;
        
        // Random animation duration
        const duration = Math.random() * 15 + 10;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Delay to create staggered effect
        snowflake.style.animationDelay = `-${Math.random() * duration}s`;
        
        snowContainer.appendChild(snowflake);
        
        // Remove snowflake after animation
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake(); // Immediately create a new snowflake
        });
    }

    // Initial snowflake creation
    const snowflakeCount = Math.min(50, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }
}

// Trigger snowfall when page loads
document.addEventListener('DOMContentLoaded', createSnowfall);

