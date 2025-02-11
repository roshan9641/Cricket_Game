
        let scoreStr = localStorage.getItem('Score');
        let score;
        resetScore(scoreStr);
        
        function resetScore(scoreStr) {
            score = scoreStr ? JSON.parse(scoreStr) : { win: 0, lost: 0, tie: 0 };
            score.displayScore = function() {
                return `Score: Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
            };
            showResult();
        }

        function genrateComputerChoice() {
            const choices = ['Bat', 'Ball', 'Stump'];
            return choices[Math.floor(Math.random() * choices.length)];
        }

        function getResult(userMove, computerMove) {
            if (userMove === computerMove) {
                score.tie++;
                return "It's a Tie";
            }
            if (
                (userMove === 'Bat' && computerMove === 'Ball') ||
                (userMove === 'Ball' && computerMove === 'Stump') ||
                (userMove === 'Stump' && computerMove === 'Bat')
            ) {
                score.win++;
                return "You Won";
            }
            score.lost++;
            return "Computer Won";
        }

        function showResult(userMove, computerMove, result) {
            if (userMove) {
                document.getElementById('user-choice').src = `Images/${userMove.toLowerCase()}.jpg`;
            }
            if (computerMove) {
                document.getElementById('computer-choice').src = `Images/${computerMove.toLowerCase()}.jpg`;
            }

            const resultMessage = document.getElementById('result-message');
            if (result) {
                resultMessage.className = `result-message ${result.includes('Won') ? 'win' : result.includes('Tie') ? 'tie' : 'lose'}`;
                resultMessage.innerText = result;
            }
            
            document.getElementById('score').innerText = score.displayScore();
            localStorage.setItem('Score', JSON.stringify(score));
        }
    
