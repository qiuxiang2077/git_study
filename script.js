// 人生轨迹分析游戏脚本 - 简约风格，更多交互和动效
let abilities = {};
let answers = {};
let currentStep = 0;
let totalSteps = 5;

const steps = [
    { id: 'welcome', content: '<div class="card"><h1>欢迎来到人生轨迹分析</h1><p>让我们一步步探索你的未来。</p><button type="button" data-action="nextStep">开始</button></div>' },
    { id: 'abilities', content: '<div class="card"><h2>设置你的能力值</h2><div class="range-row"><label for="intelligence">智力</label><input type="range" id="intelligence" min="1" max="10" value="5" aria-valuemin="1" aria-valuemax="10" aria-valuenow="5"><span id="intelligence-value" class="range-value">5</span></div><div class="range-row"><label for="perseverance">毅力</label><input type="range" id="perseverance" min="1" max="10" value="5" aria-valuemin="1" aria-valuemax="10" aria-valuenow="5"><span id="perseverance-value" class="range-value">5</span></div><div class="range-row"><label for="luck">运气</label><input type="range" id="luck" min="1" max="10" value="5" aria-valuemin="1" aria-valuemax="10" aria-valuenow="5"><span id="luck-value" class="range-value">5</span></div><div class="range-row"><label for="social">社交</label><input type="range" id="social" min="1" max="10" value="5" aria-valuemin="1" aria-valuemax="10" aria-valuenow="5"><span id="social-value" class="range-value">5</span></div><div class="range-row"><label for="creativity">创造力</label><input type="range" id="creativity" min="1" max="10" value="5" aria-valuemin="1" aria-valuemax="10" aria-valuenow="5"><span id="creativity-value" class="range-value">5</span></div><button type="button" data-action="saveAbilities">下一步</button></div>' },
    { id: 'questions', content: '<div class="card"><h2>回答一些问题</h2><div class="form-group"><label for="interest">你的兴趣是什么？</label><select id="interest"><option>科学</option><option>艺术</option><option>商业</option><option>体育</option><option>医学</option><option>法律</option></select></div><div class="form-group"><label for="goal">你的目标是什么？</label><select id="goal"><option>高收入</option><option>帮助他人</option><option>创新</option><option>自由</option><option>名誉</option></select></div><div class="form-group"><label for="teamwork">你喜欢团队工作吗？</label><select id="teamwork"><option>是</option><option>否</option></select></div><div class="form-group"><label for="background">你的家庭背景？</label><select id="background"><option>城市</option><option>农村</option><option>富裕</option><option>普通</option></select></div><div class="form-group"><label for="risk">你愿意冒险吗？</label><select id="risk"><option>是</option><option>否</option></select></div><button type="button" data-action="saveAnswers">下一步</button></div>' },
    { id: 'college', content: '<div class="card"><h2>高考选择</h2><p>高考是一个重要节点，选择你的方向：</p><div class="button-group"><button type="button" data-action="choosePath" data-param="science">理科 - 工程师</button><button type="button" data-action="choosePath" data-param="arts">文科 - 教师</button><button type="button" data-action="choosePath" data-param="business">商科 - 企业家</button><button type="button" data-action="choosePath" data-param="sports">体育 - 运动员</button><button type="button" data-action="choosePath" data-param="medical">医学 - 医生</button><button type="button" data-action="choosePath" data-param="law">法律 - 律师</button></div></div>' },
    { id: 'post-college', content: '<div class="card"><h2>大学后选择</h2><p>毕业后，你会选择：</p><div class="button-group"><button type="button" data-action="choosePost" data-param="work">直接工作</button><button type="button" data-action="choosePost" data-param="graduate">读研</button><button type="button" data-action="choosePost" data-param="startup">创业</button><button type="button" data-action="choosePost" data-param="study-abroad">留学</button><button type="button" data-action="choosePost" data-param="travel">旅行探索</button></div></div>' },
    { id: 'result', content: '<div class="result"><h2>你的未来预测</h2><p id="prediction"></p><button type="button" data-action="restart">重新开始</button></div>' }
];

function updateProgress() {
    const bar = document.getElementById('progress-bar');
    const progressWrap = document.querySelector('.progress[role="progressbar"]');
    if (bar) {
        const pct = (currentStep / totalSteps) * 100;
        bar.style.width = pct + '%';
        if (progressWrap) progressWrap.setAttribute('aria-valuenow', Math.round(pct));
    }
}

function nextStep() {
    currentStep++;
    updateProgress();
    updateUI();
}

function updateUI() {
    const contentEl = document.getElementById('content');
    if (!contentEl) return;
    contentEl.innerHTML = steps[currentStep].content;

    if (currentStep === 0) {
        const bar = document.getElementById('progress-bar');
        const progressWrap = document.querySelector('.progress[role="progressbar"]');
        if (bar) bar.style.width = '0%';
        if (progressWrap) progressWrap.setAttribute('aria-valuenow', 0);
    }
    if (currentStep === 5) {
        const predEl = document.getElementById('prediction');
        if (predEl) predEl.textContent = calculatePrediction();
    }

    // 能力值步骤：绑定滑块 input 事件（无 oninput 内联）
    if (currentStep === 1) {
        ['intelligence', 'perseverance', 'luck', 'social', 'creativity'].forEach(id => {
            const input = document.getElementById(id);
            const valueEl = document.getElementById(id + '-value');
            if (input && valueEl) {
                const sync = () => {
                    valueEl.textContent = input.value;
                    input.setAttribute('aria-valuenow', input.value);
                };
                input.addEventListener('input', sync);
                sync();
            }
        });
    }
}

function updateValue(id) {
    const input = document.getElementById(id);
    const valueEl = document.getElementById(id + '-value');
    if (input && valueEl) {
        valueEl.textContent = input.value;
        input.setAttribute('aria-valuenow', input.value);
    }
}

function saveAbilities() {
    const ids = ['intelligence', 'perseverance', 'luck', 'social', 'creativity'];
    for (const id of ids) {
        const el = document.getElementById(id);
        if (el) abilities[id] = parseInt(el.value, 10) || 5;
    }
    showFeedback('能力值已保存！');
    nextStep();
}

function saveAnswers() {
    const fields = [
        { id: 'interest', key: 'interest' },
        { id: 'goal', key: 'goal' },
        { id: 'teamwork', key: 'teamwork' },
        { id: 'background', key: 'background' },
        { id: 'risk', key: 'risk' }
    ];
    fields.forEach(({ id, key }) => {
        const el = document.getElementById(id);
        if (el) answers[key] = el.value;
    });
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

let feedbackTimer = null;
function showFeedback(message) {
    const el = document.getElementById('feedback');
    if (!el) return;
    if (feedbackTimer) clearTimeout(feedbackTimer);
    el.textContent = message;
    el.classList.remove('hidden');
    feedbackTimer = setTimeout(() => {
        el.classList.add('hidden');
        feedbackTimer = null;
    }, 2000);
}

function calculatePrediction() {
    const def = { intelligence: 5, perseverance: 5, luck: 5, social: 5, creativity: 5 };
    const a = { ...def, ...abilities };
    const score = (a.intelligence || 0) + (a.perseverance || 0) + (a.luck || 0) + (a.social || 0) + (a.creativity || 0);
    let prediction = '';

    if (path === 'science') {
        if (postChoice === 'graduate' && score > 25) prediction = '你将成为顶尖科学家，诺贝尔奖得主，改变世界。';
        else if (postChoice === 'study-abroad' && a.intelligence > 7) prediction = '留学归国，成为知名教授。';
        else if (postChoice === 'work') prediction = '你会成为一名优秀工程师，收入稳定，家庭幸福。';
        else if (postChoice === 'startup' && answers.risk === '是') prediction = '创业成功，成为科技巨头。';
        else prediction = '生活安稳，但平凡。';
    } else if (path === 'arts') {
        if (answers.goal === '帮助他人' && answers.teamwork === '是' && postChoice === 'graduate') prediction = '你将成为知名教育家，影响一代人，获得荣誉。';
        else if (a.creativity > 7 && postChoice === 'travel') prediction = '成为自由艺术家，环游世界，作品流传。';
        else prediction = '从事创意工作，如作家或设计师，生活多彩。';
    } else if (path === 'business') {
        if (a.luck > 7 && postChoice === 'startup' && answers.risk === '是') prediction = '你将成为亿万富翁企业家，名扬四海。';
        else if (postChoice === 'study-abroad' && a.social > 7) prediction = '留学MBA，进入国际公司，高管职位。';
        else prediction = '进入大公司，事业顺利，财务自由。';
    } else if (path === 'sports') {
        if (a.perseverance > 7 && postChoice === 'graduate') prediction = '成为奥运冠军，后转型教练或评论员。';
        else if (answers.background === '农村' && a.luck > 6) prediction = '逆袭成为明星运动员。';
        else prediction = '成为教练或体育记者，热爱工作。';
    } else if (path === 'medical') {
        if (answers.goal === '帮助他人' && postChoice === 'graduate') prediction = '成为著名医生，救治无数生命，获得奖项。';
        else if (postChoice === 'study-abroad') prediction = '留学医学，国际专家。';
        else prediction = '医院医生，稳定生活，帮助社区。';
    } else if (path === 'law') {
        if (a.social > 7 && postChoice === 'graduate') prediction = '成为大律师，辩护名人案件。';
        else if (answers.goal === '名誉') prediction = '进入政界，成为官员。';
        else prediction = '事务所律师，收入不错。';
    }

    return prediction || '基于你的选择，未来充满可能，请勇敢前行。';
}

function restart() {
    currentStep = 0;
    path = '';
    postChoice = '';
    abilities = {};
    answers = {};
    updateProgress();
    updateUI();
}

function handleAction(e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const param = btn.getAttribute('data-param');
    if (typeof window[action] === 'function') {
        param != null ? window[action](param) : window[action]();
    }
}

function init() {
    const container = document.querySelector('.container');
    const contentEl = document.getElementById('content');
    if (!container || !contentEl) return;
    container.addEventListener('click', handleAction);
    updateUI();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}