// 人生轨迹分析小游戏脚本
let abilities = {};
let answers = {};
let currentStep = 0;

const steps = [
    { id: 'welcome', content: '<h1>欢迎来到人生轨迹分析游戏！</h1><p>让我们一起探索你的未来。</p><button onclick="nextStep()">开始</button>' },
    { id: 'abilities', content: '<h2>设置你的能力值</h2><label>智力 (1-10): <input type="number" id="intelligence" min="1" max="10" value="5"></label><br><label>毅力 (1-10): <input type="number" id="perseverance" min="1" max="10" value="5"></label><br><label>运气 (1-10): <input type="number" id="luck" min="1" max="10" value="5"></label><br><button onclick="saveAbilities()">下一步</button>' },
    { id: 'questions', content: '<h2>回答一些问题</h2><label>你的兴趣是什么？<select id="interest"><option>科学</option><option>艺术</option><option>商业</option></select></label><br><label>你的目标是什么？<select id="goal"><option>高收入</option><option>帮助他人</option><option>创新</option></select></label><br><button onclick="saveAnswers()">下一步</button>' },
    { id: 'college', content: '<h2>高考选择</h2><p>高考是一个重要节点，选择你的方向：</p><button onclick="choosePath(\'science\')">理科 - 工程师</button><button onclick="choosePath(\'arts\')">文科 - 教师</button><button onclick="choosePath(\'business\')">商科 - 企业家</button>' },
    { id: 'result', content: '<div class="result"><h2>你的未来预测</h2><p id="prediction"></p><button onclick="restart()">重新开始</button></div>' }
];

function nextStep() {
    currentStep++;
    updateUI();
}

function updateUI() {
    document.getElementById('content').innerHTML = steps[currentStep].content;
}

function saveAbilities() {
    abilities.intelligence = parseInt(document.getElementById('intelligence').value);
    abilities.perseverance = parseInt(document.getElementById('perseverance').value);
    abilities.luck = parseInt(document.getElementById('luck').value);
    nextStep();
}

function saveAnswers() {
    answers.interest = document.getElementById('interest').value;
    answers.goal = document.getElementById('goal').value;
    nextStep();
}

function choosePath(path) {
    let prediction = '';
    const total = abilities.intelligence + abilities.perseverance + abilities.luck;
    if (path === 'science') {
        if (total > 20) prediction = '你将成为一名成功的工程师，收入丰厚，发明新技术。';
        else prediction = '你会成为一名普通工程师，生活稳定。';
    } else if (path === 'arts') {
        if (answers.goal === '帮助他人') prediction = '你将成为一名优秀教师，影响许多学生。';
        else prediction = '你会从事创意工作，如作家或艺术家。';
    } else if (path === 'business') {
        if (abilities.luck > 7) prediction = '你将成为企业家，财富自由。';
        else prediction = '你会进入商业领域，事业顺利。';
    }
    document.getElementById('prediction').innerText = prediction;
    nextStep();
}

function restart() {
    currentStep = 0;
    updateUI();
}

document.addEventListener('DOMContentLoaded', updateUI);