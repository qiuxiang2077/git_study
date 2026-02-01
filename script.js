// 人生轨迹分析游戏脚本 - 简约风格，更多交互和动效
let abilities = {};
let answers = {};
let currentStep = 0;
let totalSteps = 5;

const steps = [
    { id: 'welcome', content: '<div class="card"><h1>欢迎来到人生轨迹分析</h1><p>让我们一步步探索你的未来。</p><button onclick="nextStep()">开始</button></div>' },
    { id: 'abilities', content: '<div class="card"><h2>设置你的能力值</h2><label>智力 (1-10): <input type="range" id="intelligence" min="1" max="10" value="5" oninput="updateValue(\'intelligence\')"><span id="intelligence-value">5</span></label><br><label>毅力 (1-10): <input type="range" id="perseverance" min="1" max="10" value="5" oninput="updateValue(\'perseverance\')"><span id="perseverance-value">5</span></label><br><label>运气 (1-10): <input type="range" id="luck" min="1" max="10" value="5" oninput="updateValue(\'luck\')"><span id="luck-value">5</span></label><br><label>社交 (1-10): <input type="range" id="social" min="1" max="10" value="5" oninput="updateValue(\'social\')"><span id="social-value">5</span></label><br><label>创造力 (1-10): <input type="range" id="creativity" min="1" max="10" value="5" oninput="updateValue(\'creativity\')"><span id="creativity-value">5</span></label><br><button onclick="saveAbilities()">下一步</button></div>' },
    { id: 'questions', content: '<div class="card"><h2>回答一些问题</h2><label>你的兴趣是什么？<select id="interest"><option>科学</option><option>艺术</option><option>商业</option><option>体育</option><option>医学</option><option>法律</option></select></label><br><label>你的目标是什么？<select id="goal"><option>高收入</option><option>帮助他人</option><option>创新</option><option>自由</option><option>名誉</option></select></label><br><label>你喜欢团队工作吗？<select id="teamwork"><option>是</option><option>否</option></select></label><br><label>你的家庭背景？<select id="background"><option>城市</option><option>农村</option><option>富裕</option><option>普通</option></select></label><br><label>你愿意冒险吗？<select id="risk"><option>是</option><option>否</option></select></label><br><button onclick="saveAnswers()">下一步</button></div>' },
    { id: 'college', content: '<div class="card"><h2>高考选择</h2><p>高考是一个重要节点，选择你的方向：</p><button onclick="choosePath(\'science\')">理科 - 工程师</button><button onclick="choosePath(\'arts\')">文科 - 教师</button><button onclick="choosePath(\'business\')">商科 - 企业家</button><button onclick="choosePath(\'sports\')">体育 - 运动员</button><button onclick="choosePath(\'medical\')">医学 - 医生</button><button onclick="choosePath(\'law\')">法律 - 律师</button></div>' },
    { id: 'post-college', content: '<div class="card"><h2>大学后选择</h2><p>毕业后，你会选择：</p><button onclick="choosePost(\'work\')">直接工作</button><button onclick="choosePost(\'graduate\')">读研</button><button onclick="choosePost(\'startup\')">创业</button><button onclick="choosePost(\'study-abroad\')">留学</button><button onclick="choosePost(\'travel\')">旅行探索</button></div>' },
    { id: 'result', content: '<div class="result"><h2>你的未来预测</h2><p id="prediction"></p><button onclick="restart()">重新开始</button></div>' }
];

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

function nextStep() {
    currentStep++;
    updateProgress();
    updateUI();
}

function updateUI() {
    document.getElementById('content').innerHTML = steps[currentStep].content;
    if (currentStep === 0) {
        document.getElementById('progress-bar').style.width = '0%';
    }
    if (currentStep === 5) {
        document.getElementById('prediction').innerText = calculatePrediction();
    }
}

function updateValue(id) {
    document.getElementById(id + '-value').innerText = document.getElementById(id).value;
}

function saveAbilities() {
    abilities.intelligence = parseInt(document.getElementById('intelligence').value);
    abilities.perseverance = parseInt(document.getElementById('perseverance').value);
    abilities.luck = parseInt(document.getElementById('luck').value);
    abilities.social = parseInt(document.getElementById('social').value);
    abilities.creativity = parseInt(document.getElementById('creativity').value);
    showFeedback('能力值已保存！');
    nextStep();
}

function saveAnswers() {
    answers.interest = document.getElementById('interest').value;
    answers.goal = document.getElementById('goal').value;
    answers.teamwork = document.getElementById('teamwork').value;
    answers.background = document.getElementById('background').value;
    answers.risk = document.getElementById('risk').value;
    showFeedback('答案已保存！');
    nextStep();
}

let path = '';
function choosePath(selectedPath) {
    path = selectedPath;
    showFeedback('选择已记录！');
    nextStep();
}

let postChoice = '';
function choosePost(choice) {
    postChoice = choice;
    showFeedback('选择已记录！');
    nextStep();
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerText = message;
    document.body.appendChild(feedback);
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

function calculatePrediction() {
    let score = abilities.intelligence + abilities.perseverance + abilities.luck + abilities.social + abilities.creativity;
    let prediction = '';

    if (path === 'science') {
        if (postChoice === 'graduate' && score > 25) prediction = '你将成为顶尖科学家，诺贝尔奖得主，改变世界。';
        else if (postChoice === 'study-abroad' && abilities.intelligence > 7) prediction = '留学归国，成为知名教授。';
        else if (postChoice === 'work') prediction = '你会成为一名优秀工程师，收入稳定，家庭幸福。';
        else if (postChoice === 'startup' && answers.risk === '是') prediction = '创业成功，成为科技巨头。';
        else prediction = '生活安稳，但平凡。';
    } else if (path === 'arts') {
        if (answers.goal === '帮助他人' && answers.teamwork === '是' && postChoice === 'graduate') prediction = '你将成为知名教育家，影响一代人，获得荣誉。';
        else if (abilities.creativity > 7 && postChoice === 'travel') prediction = '成为自由艺术家，环游世界，作品流传。';
        else prediction = '从事创意工作，如作家或设计师，生活多彩。';
    } else if (path === 'business') {
        if (abilities.luck > 7 && postChoice === 'startup' && answers.risk === '是') prediction = '你将成为亿万富翁企业家，名扬四海。';
        else if (postChoice === 'study-abroad' && abilities.social > 7) prediction = '留学MBA，进入国际公司，高管职位。';
        else prediction = '进入大公司，事业顺利，财务自由。';
    } else if (path === 'sports') {
        if (abilities.perseverance > 7 && postChoice === 'graduate') prediction = '成为奥运冠军，后转型教练或评论员。';
        else if (answers.background === '农村' && abilities.luck > 6) prediction = '逆袭成为明星运动员。';
        else prediction = '成为教练或体育记者，热爱工作。';
    } else if (path === 'medical') {
        if (answers.goal === '帮助他人' && postChoice === 'graduate') prediction = '成为著名医生，救治无数生命，获得奖项。';
        else if (postChoice === 'study-abroad') prediction = '留学医学，国际专家。';
        else prediction = '医院医生，稳定生活，帮助社区。';
    } else if (path === 'law') {
        if (abilities.social > 7 && postChoice === 'graduate') prediction = '成为大律师，辩护名人案件。';
        else if (answers.goal === '名誉') prediction = '进入政界，成为官员。';
        else prediction = '事务所律师，收入不错。';
    }

    return prediction;
}

function restart() {
    currentStep = 0;
    path = '';
    postChoice = '';
    updateUI();
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    // 添加进度条到container
    const progressDiv = document.createElement('div');
    progressDiv.className = 'progress';
    progressDiv.innerHTML = '<div id="progress-bar" class="progress-bar"></div>';
    document.querySelector('.container').prepend(progressDiv);
});