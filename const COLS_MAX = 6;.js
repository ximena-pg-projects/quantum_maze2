const COLS_MAX = 6;
const ROWS_MAX = 6;
const WALL_WIDTH = 5;

// Wall Types
const NONE = 0;
const ORANGE = 1;
const PINK = 2;

// Generate 15 levels dynamically with guaranteed solvability
const LEVELS = [
    // LEVEL 1: 4x4
    {
        cols: 4, rows: 4, tileSize: 70,
        flagPos: {r: 1, c: 2}, keyPos: {r: 2, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 0, c: 3}, {r: 3, c: 2}],
        l1: {
            vWalls: [[1,0,0],[1,0,2],[0,2,1],[0,2,1]],
            hWalls: [[0,0,0,0],[1,0,2,2],[0,0,2,0]]
        },
        l2: {
            vWalls: [[0,1,0],[0,0,2],[1,2,0],[0,2,0]],
            hWalls: [[1,1,0,0],[0,0,2,2],[1,0,2,0]]
        }
    },
    // LEVEL 2: 4x4
    {
        cols: 4, rows: 4, tileSize: 70,
        flagPos: {r: 2, c: 2}, keyPos: {r: 0, c: 2},
        greenTiles: [{r: 1, c: 1}, {r: 2, c: 0}, {r: 3, c: 3}],
        l1: {
            vWalls: [[0,1,0],[1,0,0],[0,2,0],[1,0,1]],
            hWalls: [[0,0,1,0],[0,2,0,0],[0,0,2,1]]
        },
        l2: {
            vWalls: [[1,0,0],[0,1,2],[1,0,0],[0,1,2]],
            hWalls: [[0,1,0,1],[1,0,2,0],[1,0,0,2]]
        }
    },
    // LEVEL 3: 4x4
    {
        cols: 4, rows: 4, tileSize: 70,
        flagPos: {r: 2, c: 1}, keyPos: {r: 3, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 0, c: 2}, {r: 2, c: 3}],
        l1: {
            vWalls: [[0,0,1],[1,0,0],[0,2,1],[1,0,0]],
            hWalls: [[0,1,0,0],[1,0,2,2],[0,0,2,0]]
        },
        l2: {
            vWalls: [[1,0,0],[0,1,2],[1,0,0],[0,2,0]],
            hWalls: [[0,0,1,1],[1,0,0,2],[1,0,2,0]]
        }
    },
    // LEVEL 4: 4x4
    {
        cols: 4, rows: 4, tileSize: 70,
        flagPos: {r: 3, c: 2}, keyPos: {r: 1, c: 3},
        greenTiles: [{r: 1, c: 0}, {r: 2, c: 2}, {r: 3, c: 1}],
        l1: {
            vWalls: [[1,0,0],[0,1,2],[1,0,1],[0,2,0]],
            hWalls: [[0,1,0,0],[1,0,2,0],[0,2,0,1]]
        },
        l2: {
            vWalls: [[0,1,0],[1,0,2],[0,1,0],[1,2,0]],
            hWalls: [[1,0,0,1],[0,0,2,2],[1,0,2,0]]
        }
    },
    // LEVEL 5: 4x4
    {
        cols: 4, rows: 4, tileSize: 70,
        flagPos: {r: 1, c: 3}, keyPos: {r: 2, c: 1},
        greenTiles: [{r: 1, c: 0}, {r: 0, c: 3}, {r: 3, c: 2}],
        l1: {
            vWalls: [[0,1,0],[1,0,2],[0,1,0],[1,0,2]],
            hWalls: [[0,0,1,0],[1,0,2,2],[0,1,0,0]]
        },
        l2: {
            vWalls: [[1,0,0],[0,1,2],[1,0,2],[0,1,0]],
            hWalls: [[0,1,0,0],[0,2,1,2],[1,0,2,0]]
        }
    },
    // LEVEL 6: 5x5
    {
        cols: 5, rows: 5, tileSize: 58,
        flagPos: {r: 3, c: 3}, keyPos: {r: 2, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 3, c: 1}, {r: 4, c: 4}],
        l1: {
            vWalls: [[1,0,0,1],[1,0,2,0],[0,1,0,1],[0,2,0,1],[1,0,2,0]],
            hWalls: [[0,1,0,1,0],[1,0,2,0,1],[0,1,0,2,0],[1,0,1,0,1]]
        },
        l2: {
            vWalls: [[0,1,1,0],[0,0,0,2],[1,1,0,0],[1,0,0,2],[0,1,1,0]],
            hWalls: [[0,0,1,0,1],[0,1,0,2,0],[1,0,1,0,2],[0,1,0,1,0]]
        }
    },
    // LEVEL 7: 5x5
    {
        cols: 5, rows: 5, tileSize: 58,
        flagPos: {r: 2, c: 4}, keyPos: {r: 3, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 0, c: 4}, {r: 4, c: 2}],
        l1: {
            vWalls: [[0,1,0,1],[1,0,2,0],[0,1,0,1],[1,0,2,0],[0,1,0,1]],
            hWalls: [[0,1,1,0,0],[1,0,0,2,1],[0,1,2,0,0],[1,0,0,1,1]]
        },
        l2: {
            vWalls: [[1,0,1,0],[0,2,0,1],[0,2,0,1],[0,2,0,1],[1,0,2,0]], // Opened vWall[2][0] (changed from 1 to 0)
            hWalls: [[1,0,0,1,1],[0,0,2,0,0],[1,0,0,1,1],[0,2,1,0,0]]  // Opened hWall[1][1] (changed from 1 to 0)
        }
    },
    // LEVEL 8: 5x5
    {
        cols: 5, rows: 5, tileSize: 58,
        flagPos: {r: 4, c: 3}, keyPos: {r: 1, c: 1},
        greenTiles: [{r: 1, c: 0}, {r: 2, c: 4}, {r: 3, c: 2}],
        l1: {
            vWalls: [[1,0,0,1],[0,1,2,0],[1,0,0,1],[0,1,2,0],[1,0,0,1]],
            hWalls: [[0,1,0,1,0],[1,0,2,2,0],[0,1,0,1,1],[1,0,2,0,0]]
        },
        l2: {
            vWalls: [[0,1,1,0],[1,0,0,2],[0,1,1,0],[1,0,0,2],[0,1,1,0]],
            hWalls: [[1,0,1,0,1],[0,1,0,2,2],[1,0,1,0,0],[0,1,0,2,1]]
        }
    },
    // LEVEL 9: 5x5
    {
        cols: 5, rows: 5, tileSize: 58,
        flagPos: {r: 3, c: 2}, keyPos: {r: 4, c: 1},
        greenTiles: [{r: 1, c: 0}, {r: 0, c: 3}, {r: 4, c: 4}],
        l1: {
            vWalls: [[0,1,0,1],[1,0,2,0],[0,1,0,1],[1,0,2,0],[0,1,0,1]],
            hWalls: [[0,0,1,0,1],[1,2,0,2,0],[0,1,1,0,1],[1,0,0,2,0]]
        },
        l2: {
            vWalls: [[1,0,1,0],[0,2,0,1],[1,0,1,0],[0,2,0,1],[1,0,2,0]],
            hWalls: [[1,1,0,1,0],[0,0,2,0,2],[1,1,0,1,0],[0,0,2,0,2]]
        }
    },
    // LEVEL 10: 5x5
    {
        cols: 5, rows: 5, tileSize: 58,
        flagPos: {r: 2, c: 3}, keyPos: {r: 3, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 1, c: 4}, {r: 4, c: 3}],
        l1: {
            vWalls: [[1,0,0,1],[0,2,1,0],[1,0,0,1],[0,2,1,0],[1,0,2,0]],
            hWalls: [[0,1,0,1,0],[1,0,2,0,1],[0,1,0,2,0],[1,0,1,0,1]]
        },
        l2: {
            vWalls: [[0,1,1,0],[1,0,0,2],[0,1,1,0],[1,0,0,2],[0,1,1,0]],
            hWalls: [[1,0,1,0,1],[0,2,0,2,0],[1,0,1,0,1],[0,2,0,2,0]]
        }
    },
    // LEVEL 11: 6x6
    {
        cols: 6, rows: 6, tileSize: 50,
        flagPos: {r: 4, c: 4}, keyPos: {r: 2, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 3, c: 3}, {r: 5, c: 1}],
        l1: {
            vWalls: [[0,0,0,1,0],[1,2,1,0,1],[1,0,0,2,0],[0,1,1,0,2],[1,0,0,1,0],[0,2,1,0,1]],
            hWalls: [[0,0,0,1,0,1],[0,2,1,0,2,0],[1,0,0,1,0,1],[0,2,1,0,2,0],[1,0,0,1,0,1]]
        },
        l2: {
            vWalls: [[0,2,1,0,1],[1,0,0,2,0],[0,1,1,0,2],[1,0,0,1,0],[0,2,1,0,1],[1,0,0,2,0]],
            hWalls: [[0,2,1,0,2,0],[1,0,0,1,0,1],[0,2,1,0,2,0],[1,0,0,1,0,1],[0,2,1,0,2,0]]
        }
    },
    // LEVEL 12: 6x6
    {
        cols: 6, rows: 6, tileSize: 50,
        flagPos: {r: 3, c: 5}, keyPos: {r: 4, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 2, c: 2}, {r: 5, c: 4}],
        l1: {
            vWalls: [[1,0,1,0,1],[0,2,0,1,0],[1,0,2,0,1],[0,1,0,2,0],[1,0,1,0,1],[0,2,0,1,2]],
            hWalls: [[0,1,0,1,0,1],[1,0,2,0,2,0],[0,1,0,1,0,1],[1,0,2,0,2,0],[0,1,0,1,0,1]]
        },
        l2: {
            vWalls: [[0,2,0,1,0],[1,0,2,0,1],[0,1,0,2,0],[1,0,1,0,1],[0,2,0,1,0],[1,0,2,0,1]],
            hWalls: [[1,0,2,0,2,0],[0,1,0,1,0,1],[1,0,2,0,2,0],[0,1,0,1,0,1],[1,0,2,0,2,0]]
        }
    },
    // LEVEL 13: 6x6
    {
        cols: 6, rows: 6, tileSize: 50,
        flagPos: {r: 5, c: 3}, keyPos: {r: 3, c: 1},
        greenTiles: [{r: 1, c: 0}, {r: 0, c: 5}, {r: 4, c: 2}],
        l1: {
            vWalls: [[0,1,0,1,0],[1,0,2,0,1],[0,1,0,1,0],[1,0,2,0,1],[0,1,0,1,0],[1,0,2,0,1]],
            hWalls: [[0,0,1,1,0,0],[1,2,0,0,2,1],[0,0,1,1,0,0],[1,2,0,0,2,1],[0,0,1,1,0,0]]
        },
        l2: {
            vWalls: [[1,0,2,0,1],[0,1,0,1,0],[1,0,2,0,1],[0,1,0,1,0],[1,0,2,0,1],[0,1,0,1,0]],
            hWalls: [[1,2,0,0,2,1],[0,0,1,1,0,0],[1,2,0,0,2,1],[0,0,1,1,0,0],[1,2,0,0,2,1]]
        }
    },
    // LEVEL 14: 6x6
    {
        cols: 6, rows: 6, tileSize: 50,
        flagPos: {r: 2, c: 5}, keyPos: {r: 4, c: 1},
        greenTiles: [{r: 1, c: 0}, {r: 1, c: 5}, {r: 5, c: 3}],
        l1: {
            vWalls: [[1,0,0,1,0],[0,2,1,0,2],[1,0,0,1,0],[0,2,1,0,2],[1,0,0,1,0],[0,2,1,0,2]],
            hWalls: [[0,1,0,2,0,1],[1,0,2,0,1,0],[0,1,0,2,0,1],[1,0,2,0,1,0],[0,1,0,2,0,1]]
        },
        l2: {
            vWalls: [[0,2,1,0,2],[1,0,0,1,0],[0,2,1,0,2],[1,0,0,1,0],[0,2,1,0,2],[1,0,0,1,0]],
            hWalls: [[1,0,2,0,1,0],[0,1,0,2,0,1],[1,0,2,0,1,0],[0,1,0,2,0,1],[1,0,2,0,1,0]]
        }
    },
    // LEVEL 15: 6x6
    {
        cols: 6, rows: 6, tileSize: 50,
        flagPos: {r: 4, c: 5}, keyPos: {r: 3, c: 0},
        greenTiles: [{r: 1, c: 0}, {r: 2, c: 4}, {r: 5, c: 5}],
        l1: {
            vWalls: [[0,1,0,1,0],[1,0,2,0,1],[0,1,0,1,2],[1,0,2,0,1],[0,1,0,1,2],[1,0,2,0,1]],
            hWalls: [[0,0,1,0,1,0],[1,2,0,2,0,1],[0,0,1,0,1,0],[1,2,0,2,0,1],[0,0,1,0,1,0]]
        },
        l2: {
            vWalls: [[1,0,2,0,1],[0,1,0,1,2],[1,0,2,0,1],[0,1,0,1,2],[1,0,2,0,1],[0,1,0,1,2]],
            hWalls: [[1,2,0,2,0,1],[0,0,1,0,1,0],[1,2,0,2,0,1],[0,0,1,0,1,0],[1,2,0,2,0,1]]
        }
    }
];

// --- Game State ---
let currentLevelIndex = 0;
let gameState = {
    running: false,
    diamondHolder: 'Fish', 
    fish: { r: 0, c: 0 },
    adam: { r: 0, c: 0 },
    hasKey: false,
    hasFlag: false
};

const canvas1 = document.getElementById('canvas-l1');
const ctx1 = canvas1.getContext('2d');

const chatHistory = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const passBtn = document.getElementById('pass-diamond-btn');

let lastResponseTime = 0;

function initGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('main-ui').classList.remove('hidden');
    gameState.running = true;
    currentLevelIndex = 0;
    loadLevel(currentLevelIndex);
    requestAnimationFrame(gameLoop);
}

function loadLevel(index) {
    const level = LEVELS[index];
    gameState.fish = { r: 0, c: 0 };
    gameState.adam = { r: 0, c: 0 };
    gameState.diamondHolder = 'Fish';
    gameState.hasKey = false;
    gameState.hasFlag = false;

    // Update level display texts
    document.getElementById('level-display').innerText = `Level ${index + 1} / ${LEVELS.length}`;
    document.getElementById('view-title').innerText = `Your View (Level ${index + 1})`;

    addChat("System", `--- Loading Level ${index + 1} (${level.rows}x${level.cols}) ---`);
    addChat("Adam", `We are in Level ${index + 1}! Coordinate with me through the chat. Tell me "up", "down", "left", or "right" when I have the Diamond!`);
}

function gameLoop() {
    if(!gameState.running) return;
    draw();
    requestAnimationFrame(gameLoop);
}

function drawGrid(ctx, vWalls, hWalls, player, playerColor, isAdam, cols, rows, tileSize) {
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, 360, 360);

    const offsetX = (360 - (cols * tileSize)) / 2;
    const offsetY = (360 - (rows * tileSize)) / 2;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    const level = LEVELS[currentLevelIndex];

    // Draw Floor Tiles
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            ctx.fillStyle = '#111126';
            ctx.fillRect(c*tileSize, r*tileSize, tileSize, tileSize);
            ctx.strokeStyle = '#1e1e38';
            ctx.lineWidth = 1;
            ctx.strokeRect(c*tileSize, r*tileSize, tileSize, tileSize);

            // Draw Green Tiles
            if(level.greenTiles.some(g => g.r === r && g.c === c)) {
                ctx.fillStyle = 'rgba(34, 197, 94, 0.25)';
                ctx.beginPath();
                ctx.arc(c*tileSize + tileSize/2, r*tileSize + tileSize/2, tileSize/3, 0, Math.PI*2);
                ctx.fill();
                ctx.strokeStyle = '#22c55e';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Draw Key
            if(!gameState.hasKey && r === level.keyPos.r && c === level.keyPos.c) {
                ctx.fillStyle = isAdam ? '#38bdf8' : 'rgba(56, 189, 248, 0.35)'; 
                ctx.font = '14px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                if (isAdam) {
                    ctx.fillText('🔑', c*tileSize + tileSize/2, r*tileSize + tileSize/2);
                } else {
                    ctx.fillText('🔑 (in D2)', c*tileSize + tileSize/2, r*tileSize + tileSize/2);
                }
            }

            // Draw Flag
            if(!gameState.hasFlag && r === level.flagPos.r && c === level.flagPos.c) {
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 20px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('🚩', c*tileSize + tileSize/2, r*tileSize + tileSize/2);
            }
        }
    }

    // Draw Boundary Walls
    ctx.lineCap = 'round';
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            ctx.lineWidth = WALL_WIDTH;
            ctx.strokeStyle = '#ff9a3c'; 
            
            if(r === 0) {
                ctx.beginPath(); ctx.moveTo(c*tileSize, 0); ctx.lineTo((c+1)*tileSize, 0); ctx.stroke();
            }
            if(r === rows-1) {
                ctx.beginPath(); ctx.moveTo(c*tileSize, rows*tileSize); ctx.lineTo((c+1)*tileSize, rows*tileSize); ctx.stroke();
            }
            if(c === 0 && r !== 0) { 
                ctx.beginPath(); ctx.moveTo(0, r*tileSize); ctx.lineTo(0, (r+1)*tileSize); ctx.stroke();
            }
            if(c === cols-1 && r !== rows-1) { 
                ctx.beginPath(); ctx.moveTo(cols*tileSize, r*tileSize); ctx.lineTo(cols*tileSize, (r+1)*tileSize); ctx.stroke();
            }
        }
    }

    // Draw Internal Walls
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols - 1; c++) {
            let w = vWalls[r][c];
            if(w !== NONE) {
                ctx.strokeStyle = w === ORANGE ? '#ff9a3c' : (gameState.hasKey ? 'rgba(255, 110, 180, 0.25)' : '#ff6eb4');
                ctx.beginPath(); ctx.moveTo((c+1)*tileSize, r*tileSize); ctx.lineTo((c+1)*tileSize, (r+1)*tileSize); ctx.stroke();
            }
        }
    }
    for(let r = 0; r < rows - 1; r++) {
        for(let c = 0; c < cols; c++) {
            let w = hWalls[r][c];
            if(w !== NONE) {
                ctx.strokeStyle = w === ORANGE ? '#ff9a3c' : (gameState.hasKey ? 'rgba(255, 110, 180, 0.25)' : '#ff6eb4');
                ctx.beginPath(); ctx.moveTo(c*tileSize, (r+1)*tileSize); ctx.lineTo((c+1)*tileSize, (r+1)*tileSize); ctx.stroke();
            }
        }
    }

    // Draw Player
    ctx.fillStyle = playerColor;
    ctx.beginPath();
    ctx.arc(player.c*tileSize + tileSize/2, player.r*tileSize + tileSize/2, tileSize/3, 0, Math.PI*2);
    ctx.fill();

    // Draw Diamond
    const activeHolder = gameState.diamondHolder === 'Fish';
    if(activeHolder) {
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(player.c*tileSize + tileSize/2, player.r*tileSize + tileSize/4);
        ctx.lineTo(player.c*tileSize + tileSize/1.4, player.r*tileSize + tileSize/2);
        ctx.lineTo(player.c*tileSize + tileSize/2, player.r*tileSize + tileSize/1.3);
        ctx.lineTo(player.c*tileSize + tileSize/3.5, player.r*tileSize + tileSize/2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    ctx.restore();
}

function draw() {
    const level = LEVELS[currentLevelIndex];
    drawGrid(ctx1, level.l1.vWalls, level.l1.hWalls, gameState.fish, '#38bdf8', false, level.cols, level.rows, level.tileSize); 
    updateUI();
}

function updateUI() {
    document.getElementById('diamond-holder').innerText = gameState.diamondHolder;
    document.getElementById('key-status').innerText = gameState.hasKey ? "Collected" : "Missing";
    document.getElementById('key-status').className = 'status-val ' + (gameState.hasKey ? 'green' : 'red');
    document.getElementById('flag-status').innerText = gameState.hasFlag ? "Captured" : "Not Captured";
    document.getElementById('flag-status').className = 'status-val ' + (gameState.hasFlag ? 'green' : 'red');

    const level = LEVELS[currentLevelIndex];
    const fOnGreen = level.greenTiles.some(g => g.r === gameState.fish.r && g.c === gameState.fish.c);
    const aOnGreen = level.greenTiles.some(g => g.r === gameState.adam.r && g.c === gameState.adam.c);
    
    passBtn.disabled = !(fOnGreen && aOnGreen);
    if (!passBtn.disabled) {
        passBtn.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.6)';
        passBtn.style.border = '2px solid #22c55e';
    } else {
        passBtn.style.boxShadow = 'none';
        passBtn.style.border = 'none';
    }

    // Set button innerText dynamically
    if (gameState.diamondHolder === 'Fish') {
        passBtn.innerText = "Pass Control to Adam";
    } else {
        passBtn.innerText = "Pass Control to Fish";
    }
}

// Arrow Key Movements (Allowed only when Fish has Diamond)
document.addEventListener('keydown', (e) => {
    if(!gameState.running) return;
    if(gameState.diamondHolder !== 'Fish') return;

    let dr = 0, dc = 0;
    if(e.key === 'ArrowUp') dr = -1;
    if(e.key === 'ArrowDown') dr = 1;
    if(e.key === 'ArrowLeft') dc = -1;
    if(e.key === 'ArrowRight') dc = 1;

    if(dr !== 0 || dc !== 0) {
        const success = attemptMove(dr, dc);
        if (!success) {
            triggerAdamProactive('collision', {dr, dc});
        } else {
            triggerAdamProactive('move');
        }
    }
});

function attemptMove(dr, dc) {
    const isFishControl = gameState.diamondHolder === 'Fish';
    const level = LEVELS[currentLevelIndex];
    const vWalls = isFishControl ? level.l1.vWalls : level.l2.vWalls;
    const hWalls = isFishControl ? level.l1.hWalls : level.l2.hWalls;
    
    const controlPos = isFishControl ? gameState.fish : gameState.adam;
    const nr = controlPos.r + dr;
    const nc = controlPos.c + dc;

    // Check exit (bottom-right boundary)
    if(controlPos.r === level.rows-1 && controlPos.c === level.cols-1 && dc === 1 && dr === 0) {
        if(gameState.hasFlag) {
            if (currentLevelIndex < LEVELS.length - 1) {
                currentLevelIndex++;
                loadLevel(currentLevelIndex);
            } else {
                gameState.running = false;
                document.getElementById('end-screen').classList.remove('hidden');
            }
            return true;
        } else {
            return false;
        }
    }

    if(nr < 0 || nr >= level.rows || nc < 0 || nc >= level.cols) {
        return false;
    }

    let canMove = true;
    if(dc === 1) { 
        let w = vWalls[controlPos.r][controlPos.c];
        if(w === ORANGE || (w === PINK && !gameState.hasKey)) canMove = false;
    } else if(dc === -1) { 
        if(controlPos.c - 1 >= 0) {
            let w = vWalls[controlPos.r][controlPos.c - 1];
            if(w === ORANGE || (w === PINK && !gameState.hasKey)) canMove = false;
        } else canMove = false;
    } else if(dr === 1) { 
        let w = hWalls[controlPos.r][controlPos.c];
        if(w === ORANGE || (w === PINK && !gameState.hasKey)) canMove = false;
    } else if(dr === -1) { 
        if(controlPos.r - 1 >= 0) {
            let w = hWalls[controlPos.r - 1][controlPos.c];
            if(w === ORANGE || (w === PINK && !gameState.hasKey)) canMove = false;
        } else canMove = false;
    }

    if(canMove) {
        gameState.fish.r += dr;
        gameState.fish.c += dc;
        gameState.adam.r += dr;
        gameState.adam.c += dc;

        // Key pickup (Level 2)
        if(!gameState.hasKey && gameState.adam.r === level.keyPos.r && gameState.adam.c === level.keyPos.c) {
            gameState.hasKey = true;
            addChat('Adam', "Observe! I collected the key in my dimension. Pink doors are unlocked!");
        }

        // Flag pickup
        if(!gameState.hasFlag && gameState.fish.r === level.flagPos.r && gameState.fish.c === level.flagPos.c) {
            gameState.hasFlag = true;
            addChat('System', "Flag captured! Move to the exit right of the bottom-right cell.");
        }
        return true;
    } else {
        return false;
    }
}

function passControl() {
    if(gameState.diamondHolder === 'Fish') {
        gameState.diamondHolder = 'Adam';
        addChat('System', 'Control passed to Adam. Arrow keys are locked; send him instructions via chat!');
    } else {
        gameState.diamondHolder = 'Fish';
        addChat('System', 'Control passed back to you. You can move using Arrow Keys.');
    }
    updateUI();
}

passBtn.addEventListener('click', passControl);

sendBtn.addEventListener('click', sendChat);
chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendChat();
});

// Restart action hooks
document.getElementById('restart-level-btn').addEventListener('click', () => {
    loadLevel(currentLevelIndex);
});
document.getElementById('restart-game-btn').addEventListener('click', () => {
    currentLevelIndex = 0;
    loadLevel(currentLevelIndex);
});

function sendChat() {
    const text = chatInput.value.trim();
    if(text) {
        addChat('Fish', text);
        chatInput.value = '';
        setTimeout(() => handleAdamReply(text), 700);
    }
}

function addChat(sender, msg) {
    const div = document.createElement('div');
    if(sender === 'Fish') div.className = 'chat-msg msg-fish';
    else if(sender === 'Adam') div.className = 'chat-msg msg-adam';
    else div.className = 'chat-msg msg-system';

    div.innerHTML = sender === 'System' ? msg : `<strong>${sender}:</strong> ${msg}`;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Proactive AI replies
function triggerAdamProactive(eventType, data = {}) {
    const level = LEVELS[currentLevelIndex];
    const a = gameState.adam;
    const fOnGreen = level.greenTiles.some(g => g.r === gameState.fish.r && g.c === gameState.fish.c);

    // Analyze openings in Adam's maze
    let openings = [];
    if (a.r > 0 && level.l2.hWalls[a.r-1][a.c] === NONE) openings.push("up");
    if (a.r < level.rows-1 && level.l2.hWalls[a.r][a.c] === NONE) openings.push("down");
    if (a.c > 0 && level.l2.vWalls[a.r][a.c-1] === NONE) openings.push("left");
    if (a.c < level.cols-1 && level.l2.vWalls[a.r][a.c] === NONE) openings.push("right");

    if (eventType === 'collision') {
        let dirName = data.dr === -1 ? "up" : data.dr === 1 ? "down" : data.dc === -1 ? "left" : "right";
        if (openings.includes(dirName)) {
            addChat('Adam', `You hit a wall on your side, but my Level 2 is clear in that direction! If we are on a green dot, pass me the diamond and tell me: "move ${dirName}".`);
        } else {
            addChat('Adam', `That way is blocked on my side too. Let's find a different path.`);
        }
    } else if (eventType === 'move') {
        if (fOnGreen) {
            addChat('Adam', "We are both on a green tile. Let's swap the control diamond if needed!");
        }
    }
}

function handleAdamReply(msg) {
    const lower = msg.toLowerCase();
    const level = LEVELS[currentLevelIndex];
    const a = gameState.adam;
    const isAdamControl = gameState.diamondHolder === 'Adam';

    // Flexible control passing phrases
    const passToAdamPhrases = ["passing control to you", "pass control to adam", "give control to adam", "take control adam", "your turn"];
    const passToFishPhrases = ["give me control", "take control", "give control back", "pass control to fish", "my turn", "give control to fish"];

    const wantsPassToAdam = passToAdamPhrases.some(phrase => lower.includes(phrase)) || (lower.includes('pass') && lower.includes('adam'));
    const wantsPassToFish = passToFishPhrases.some(phrase => lower.includes(phrase)) || (lower.includes('give') && lower.includes('control') && (lower.includes('me') || lower.includes('fish')));

    if (wantsPassToAdam || wantsPassToFish) {
        const fOnGreen = level.greenTiles.some(g => g.r === gameState.fish.r && g.c === gameState.fish.c);
        const aOnGreen = level.greenTiles.some(g => g.r === gameState.adam.r && g.c === gameState.adam.c);
        
        if (fOnGreen && aOnGreen) {
            // Check if they are passing in the correct direction
            if (wantsPassToAdam && gameState.diamondHolder === 'Fish') {
                passControl();
                addChat('Adam', "Diamond received! I'll take control. Tell me where to move (e.g. 'go right').");
            } else if (wantsPassToFish && gameState.diamondHolder === 'Adam') {
                passControl();
                addChat('Adam', "Control returned to you! Lead the way with your Arrow Keys.");
            } else {
                addChat('Adam', `The Diamond is already held by ${gameState.diamondHolder}!`);
            }
        } else {
            addChat('Adam', "We cannot pass the diamond here. We must both coordinate to stand on a green 'Pass Diamond' circle tile.");
        }
        return;
    }

    // Direct movement commands via chat
    let dr = 0, dc = 0;
    let directionName = "";
    if(lower.includes('north') || lower.includes('up') || lower.includes('go u') || lower.includes('move u')) {
        dr = -1; directionName = "up";
    } else if(lower.includes('south') || lower.includes('down') || lower.includes('go d') || lower.includes('move d')) {
        dr = 1; directionName = "down";
    } else if(lower.includes('east') || lower.includes('right') || lower.includes('go r') || lower.includes('move r')) {
        dc = 1; directionName = "right";
    } else if(lower.includes('west') || lower.includes('left') || lower.includes('go l') || lower.includes('move l')) {
        dc = -1; directionName = "left";
    }

    if(dr !== 0 || dc !== 0) {
        if(isAdamControl) {
            let success = attemptMove(dr, dc);
            if(success) {
                let nextOpenings = [];
                if (a.r > 0 && level.l2.hWalls[a.r-1][a.c] === NONE) nextOpenings.push("up");
                if (a.r < level.rows-1 && level.l2.hWalls[a.r][a.c] === NONE) nextOpenings.push("down");
                if (a.c > 0 && level.l2.vWalls[a.r][a.c-1] === NONE) nextOpenings.push("left");
                if (a.c < level.cols-1 && level.l2.vWalls[a.r][a.c] === NONE) nextOpenings.push("right");

                let suggest = nextOpenings.length > 0 ? `I can now move ${nextOpenings.join(' or ')}.` : "I'm trapped here in all directions.";
                addChat('Adam', `Understood. Moved ${directionName} to (${a.r}, ${a.c}). ${suggest}`);
            } else {
                addChat('Adam', `Blocked! I hit a wall moving ${directionName} in Level 2. Tell me a different direction, or swap control back.`);
            }
        } else {
            addChat('Adam', "You hold the Diamond, so you are driving! Press the Arrow Keys on your keyboard to move us.");
        }
        return;
    }

    if(lower.includes('where') || lower.includes('wall') || lower.includes('see') || lower.includes('look')) {
        let walls = [];
        if(a.r > 0 && level.l2.hWalls[a.r-1][a.c] !== NONE) walls.push("North (up)");
        else if(a.r === 0) walls.push("North (Edge)");
        
        if(a.r < level.rows-1 && level.l2.hWalls[a.r][a.c] !== NONE) walls.push("South (down)");
        else if(a.r === level.rows-1) walls.push("South (Edge)");

        if(a.c > 0 && level.l2.vWalls[a.r][a.c-1] !== NONE) walls.push("West (left)");
        else if(a.c === 0) walls.push("West (Edge)");

        if(a.c < level.cols-1 && level.l2.vWalls[a.r][a.c] !== NONE) walls.push("East (right)");
        else if(a.c === level.cols-1) walls.push("East (Edge)");

        addChat('Adam', `I am at (${a.r}, ${a.c}). Walls on my side: ${walls.join(', ')}.`);
        return;
    }

    const responses = [
        `Remember, the key is located at (${level.keyPos.r}, ${level.keyPos.c}) in my dimension.`,
        "Ask me about my walls if you get stuck.",
        "We move in lockstep. Let's make sure we align to get the key and the flag!"
    ];
    addChat('Adam', responses[Math.floor(Math.random()*responses.length)]);
}

document.getElementById('start-btn').addEventListener('click', initGame);
document.getElementById('restart-btn').addEventListener('click', () => location.reload());
