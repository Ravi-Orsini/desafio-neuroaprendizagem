document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    // Placeholder for next screen, will be implemented later
    // const level1Screen = document.getElementById('level-1-screen'); 

    startButton.addEventListener('click', () => {
        startScreen.classList.remove('active');
        // In a real scenario, you would show the next screen here
        // level1Screen.classList.add('active');
        alert('Começar o jogo! (Nível 1 será carregado aqui)');
        // For now, we'll just alert and then proceed to build Level 1 HTML/CSS/JS
    });
});




    const level1Screen = document.getElementById('level-1-screen');
    const level1Terms = document.querySelectorAll('.column-a .term');
    const level1Definitions = document.querySelectorAll('.column-b .definition');
    const level1Feedback = document.getElementById('level-1-feedback');
    const nextLevel2Button = document.getElementById('next-level-2-button');

    let draggedDefinition = null;
    let correctAssociations = 0;
    const totalAssociations = level1Terms.length;

    startButton.addEventListener('click', () => {
        startScreen.classList.remove('active');
        level1Screen.classList.add('active');
    });

    level1Definitions.forEach(definition => {
        definition.setAttribute('draggable', true);
        definition.addEventListener('dragstart', (e) => {
            draggedDefinition = definition;
            e.dataTransfer.setData('text/plain', definition.dataset.correctTerm);
            definition.classList.add('dragging');
        });

        definition.addEventListener('dragend', () => {
            definition.classList.remove('dragging');
        });
    });

    level1Terms.forEach(term => {
        term.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
        });

        term.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedDefinition) {
                const correctTerm = e.dataTransfer.getData('text/plain');
                const targetTerm = term.dataset.term;

                if (correctTerm === targetTerm) {
                    term.appendChild(draggedDefinition);
                    draggedDefinition.classList.add('correct');
                    draggedDefinition.setAttribute('draggable', false); // Make it non-draggable
                    term.style.backgroundColor = '#d4edda'; // Light green background for correct term
                    correctAssociations++;

                    if (correctAssociations === totalAssociations) {
                        level1Feedback.textContent = 'Parabéns! Você conectou os conceitos básicos. Preparado(a) para aprofundar? Clique para avançar!';
                        level1Feedback.classList.add('correct-message');
                        nextLevel2Button.style.display = 'block';
                    }
                } else {
                    draggedDefinition.classList.add('incorrect');
                    level1Feedback.textContent = 'Ops! Essa associação não está correta. Tente novamente.';
                    setTimeout(() => {
                        draggedDefinition.classList.remove('incorrect');
                        level1Feedback.textContent = '';
                    }, 1500);
                }
                draggedDefinition = null;
            }
        });
    });

    // Placeholder for next level button click, will be implemented later
    nextLevel2Button.addEventListener('click', () => {
        alert('Indo para o Nível 2! (Será implementado em breve)');
        // Here you would hide level1Screen and show level2Screen
    });

});






    const level2Screen = document.getElementById("level-2-screen");
    const memoryCards = document.querySelectorAll(".memory-card");
    const level2Feedback = document.getElementById("level-2-feedback");
    const nextLevel3Button = document.getElementById("next-level-3-button");

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    const totalPairs = memoryCards.length / 2;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flip");

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.pair === secondCard.dataset.pair || 
                      (firstCard.querySelector(".front-face").textContent === secondCard.dataset.pair && secondCard.querySelector(".front-face").textContent === firstCard.dataset.pair);

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            level2Feedback.textContent = "Excelente memória! Suas sinapses estão fortalecidas. Agora, o desafio final testará sua capacidade de aplicar o conhecimento na prática.";
            level2Feedback.classList.add("correct-message");
            nextLevel3Button.style.display = "block";
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
        memoryCards.forEach(card => {
            let randomPos = Math.floor(Math.random() * memoryCards.length);
            card.style.order = randomPos;
        });
    })();

    memoryCards.forEach(card => card.addEventListener("click", flipCard));

    // Update startButton listener to go to Level 1
    startButton.removeEventListener("click", () => {
        startScreen.classList.remove("active");
        alert("Começar o jogo! (Nível 1 será carregado aqui)");
    });
    startButton.addEventListener("click", () => {
        startScreen.classList.remove("active");
        level1Screen.classList.add("active");
    });

    // Update nextLevel2Button listener to go to Level 2
    nextLevel2Button.removeEventListener("click", () => {
        alert("Indo para o Nível 2! (Será implementado em breve)");
    });
    nextLevel2Button.addEventListener("click", () => {
        level1Screen.classList.remove("active");
        level2Screen.classList.add("active");
    });

    // Placeholder for nextLevel3Button click, will be implemented later
    nextLevel3Button.addEventListener("click", () => {
        alert("Indo para o Nível 3! (Será implementado em breve)");
        // Here you would hide level2Screen and show level3Screen
    });






    const level3Screen = document.getElementById("level-3-screen");
    const submitQuizButton = document.getElementById("submit-quiz-button");
    const level3Feedback = document.getElementById("level-3-feedback");
    const nextLevelFinalButton = document.getElementById("next-level-final-button");

    const correctAnswers = {
        q1: "c", // Cenário 1: Expandir
        q2: "a", // Cenário 2: Explorar
        q3: "b", // Cenário 3: Avaliar
        q4: "a"  // Cenário 4: Evocar
    };

    submitQuizButton.addEventListener("click", () => {
        let allCorrect = true;
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        for (const q in correctAnswers) {
            const selectedOption = document.querySelector(`input[name="${q}"]:checked`);
            const feedbackElement = document.getElementById(`${q}-feedback`);

            if (selectedOption) {
                if (selectedOption.value === correctAnswers[q]) {
                    feedbackElement.textContent = "Correto!";
                    feedbackElement.className = "answer-feedback correct";
                    score++;
                } else {
                    feedbackElement.textContent = `Incorreto. A resposta correta é ${correctAnswers[q].toUpperCase()}.`;
                    feedbackElement.className = "answer-feedback incorrect";
                    allCorrect = false;
                }
            } else {
                feedbackElement.textContent = "Por favor, selecione uma opção.";
                feedbackElement.className = "answer-feedback incorrect";
                allCorrect = false;
            }
        }

        if (allCorrect) {
            level3Feedback.textContent = "INCRÍVEL! Você não apenas conhece a taxonomia, mas sabe como aplicá-la. Você é um verdadeiro Profissional Radial!";
            level3Feedback.classList.add("correct-message");
            nextLevelFinalButton.style.display = "block";
            submitQuizButton.style.display = "none"; // Hide submit button
        } else {
            level3Feedback.textContent = `Você acertou ${score} de ${totalQuestions} questões. Revise e tente novamente!`;
            level3Feedback.classList.remove("correct-message");
            level3Feedback.style.color = "#d32f2f";
        }
    });

    // Update nextLevel3Button listener to go to Level 3
    nextLevel3Button.removeEventListener("click", () => {
        alert("Indo para o Nível 3! (Será implementado em breve)");
    });
    nextLevel3Button.addEventListener("click", () => {
        level2Screen.classList.remove("active");
        level3Screen.classList.add("active");
    });

    // Placeholder for nextLevelFinalButton click, will be implemented later
    nextLevelFinalButton.addEventListener("click", () => {
        alert("Ver minha conquista! (Tela Final será implementada em breve)");
        // Here you would hide level3Screen and show finalScreen
    });






    const finalScreen = document.getElementById("final-screen");
    const restartButton = document.getElementById("restart-button");

    // Update nextLevelFinalButton listener to go to Final Screen
    nextLevelFinalButton.removeEventListener("click", () => {
        alert("Ver minha conquista! (Tela Final será implementada em breve)");
    });
    nextLevelFinalButton.addEventListener("click", () => {
        level3Screen.classList.remove("active");
        finalScreen.classList.add("active");
    });

    restartButton.addEventListener("click", () => {
        location.reload(); // Simple way to restart the game
    });


