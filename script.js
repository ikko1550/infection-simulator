// 感染症データベース（カテゴリ別に分割）
const diseaseData = {
    "出席停止対象感染症": {
        "麻しん（はしか）": { text: "解熱後3日を経過していること", days: 3, characteristics: "38度以上の発熱、咳・鼻水、目の充血などに続き、口内の白い斑点や全身の赤い発疹が出現します。感染力が非常に強く、空気感染します。" },
        "インフルエンザ": { text: "発症した後、5日経過し、かつ解熱した後、2日経過していること（乳幼児にあたっては3日経過していること）", days: 5, characteristics: "突然の38度以上の高熱、頭痛、関節痛、筋肉痛、全身倦怠感などが強く現れるのが特徴です。飛沫・接触感染します。" },
        "風しん": { text: "発疹が消失していること", days: null, characteristics: "発熱、全身の小さな赤い発疹、リンパ節の腫れ（特に首や耳の後ろ）が特徴です（三日ばしか）。妊婦が感染すると胎児に影響が出る恐れがあります。" },
        "水痘（水ぼうそう）": { text: "すべての発疹が（痂皮）かさぶた化していること", days: null, characteristics: "発熱とともに、強いかゆみを伴う水ぶくれ（水疱）が全身に現れ、やがてかさぶたになります。急性期には様々な段階の発疹が混在するのが特徴です。" },
        "流行性耳下腺炎（おたふくかぜ）": { text: "耳下腺、顎下線、舌下腺の腫脹が発現してから5日経過し、かつ全身状態が良好になっていること", days: 5, characteristics: "発熱と、耳の下やあごの下（唾液腺）の腫れと痛みが特徴です。飛沫・接触感染します。" },
        "結核": { text: "医師により感染の恐れがないと認められていること", days: null, characteristics: "長引く咳、痰、微熱、だるさなどが続きます。空気感染するため、早期発見と治療が重要です。" },
        "咽頭結膜熱（プール熱）（アデノウイルス）": { text: "発熱、充血等の主な症状が消失した後2日経過していること", days: 2, characteristics: "発熱、のどの痛み、目の充血（結膜炎）が主な症状です。夏にプールなどを介して流行することがあります。" },
        "流行性角結膜炎（アデノウイルス）": { text: "結膜炎の症状が消失していること", days: null, characteristics: "白目の強い充血、大量の目やに、涙目、目の痛みが出ます。非常に感染力が強いです。" },
        "百日咳": { text: "特有の咳が消失していること。又は適切な抗菌性物質製剤による5日間の治療が終了していること", days: null, characteristics: "風邪症状から始まり、やがて「コンコンコン」と連続する激しい咳と、「ヒュー」という息の吸い込みが特徴です。" },
        "腸管出血性大腸菌感染症（O157 O111 O26等）": { text: "医師により感染の恐れがないと認められていること。（無症状病原体保有者の場合、トイレでの排泄習慣が確立している5歳児以上の小児については出席停止の必要はなく、また、5歳未満の子どもについては、2回以上連続で便から菌が検出されなければ登園可能である）", days: null, characteristics: "激しい腹痛、水のような下痢、血便が特徴です。重症化すると合併症の危険があります。経口感染します。" },
        "急性出血性結膜炎": { text: "医師により感染の恐れがないと認められていること", days: null, characteristics: "突然の強い目の痛み、白目の出血（赤目）、ゴロゴロ感、まぶたの腫れが現れます。接触感染します。" },
        "侵襲性髄膜炎菌感染症（髄膜炎菌性髄膜炎）": { text: "医師により感染の恐れがないと認められていること", days: null, characteristics: "突然の高熱、頭痛、嘔吐、意識障害などが現れ、急速に重症化することがある危険な感染症です。" },
        "新型コロナウイルス感染症": { text: "発症した後5日を経過し、かつ、症状が軽快した後1日を経過するまで", days: 5, characteristics: "発熱、咳、のどの痛み、倦怠感など風邪に似た症状のほか、味覚・嗅覚障害が出ることがあります。" }
    },
    "注意すべき感染症": {
        "溶連菌感染症": { text: "抗菌薬服用後24～48時間経過していること", days: 1, characteristics: "突然の発熱、のどの強い痛み、舌がイチゴのように赤くなる（イチゴ舌）、全身の細かい発疹が特徴です。" },
        "マイコプラズマ肺炎": { text: "発熱や激しい咳が治まっていること", days: null, characteristics: "発熱と、長引く頑固な乾いた咳が特徴です。比較的元気なことが多いですが、肺炎を起こします。" },
        "手足口病": { text: "発熱や、口腔内の水疱・潰瘍の影響がなく、普段の食事がとれること", days: null, characteristics: "口の中、手のひら、足の裏などに2〜3mmの水ぶくれ（水疱）ができます。発熱を伴うこともあります。" },
        "伝染性紅斑（リンゴ病）": { text: "全身状態が良いこと", days: null, characteristics: "両頬がリンゴのように赤くなり、その後、手足にレース状の赤い発疹が出ます。発疹が出る頃には感染力はほぼありません。" },
        "ウイルス性胃腸炎（ノロ、ロタ、アデノウイルスなど）": { text: "嘔吐、下痢などの症状が治まり、普段の食事がとれること", days: null, characteristics: "急な嘔吐、下痢、発熱、腹痛が起こります。脱水症状に注意が必要です。経口・接触感染します。" },
        "ヘルパンギーナ": { text: "発熱や、口腔内の水疱・潰瘍の影響がなく、普段の食事がとれること", days: null, characteristics: "突然の高熱と、のどの奥に小さな水ぶくれができ、強い痛みを伴う夏風邪の一種です。" },
        "RSウイルス感染症": { text: "呼吸器症状が消失し、全身状態が良いこと", days: null, characteristics: "鼻水、咳、発熱など風邪症状が出ます。特に1歳未満の乳児が感染すると細気管支炎など重症化しやすいです。" },
        "帯状疱疹": { text: "全ての発疹が（痂皮）かさぶた化していること", days: null, characteristics: "過去に感染した水ぼうそうのウイルスが原因で、体の片側に帯状に水疱ができ、強い痛みを伴います。" },
        "突発性発疹": { text: "解熱し、機嫌が良く全身状態が良いこと", days: null, characteristics: "主に2歳未満の乳幼児がかかり、3〜4日高熱が続いた後、熱が下がると同時に全身に赤い発疹が出ます。" }
    }
};

// 感染症データを取得するヘルパー関数
function getDiseaseInfo(diseaseName) {
    for (const category in diseaseData) {
        if (diseaseData[category][diseaseName]) {
            return diseaseData[category][diseaseName];
        }
    }
    return null;
}

// プルダウンの生成（optgroupを使用してグループ分け）
const diseaseSelect = document.getElementById('disease');
for (const category in diseaseData) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = `■ ${category}`;
    for (const dName in diseaseData[category]) {
        const option = document.createElement('option');
        option.value = dName;
        option.textContent = dName;
        optgroup.appendChild(option);
    }
    diseaseSelect.appendChild(optgroup);
}

// 要素の取得
const formInputs = document.querySelectorAll('input, select');
const resultBox = document.getElementById('resultBox');
const guidelineText = document.getElementById('guidelineText');
const calculatedDateText = document.getElementById('calculatedDate');
const characteristicsText = document.getElementById('characteristicsText');

// 日付計算関数（発症日を0日目としてX日経過＝X+1日目から登園可能）
function getMinReturnDate(onsetDateStr, daysPassed) {
    if (!onsetDateStr || daysPassed === null) return "";
    const d = new Date(onsetDateStr);
    d.setDate(d.getDate() + daysPassed + 1);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// 入力更新時の処理
function updateResult() {
    const disease = diseaseSelect.value;
    const onsetDate = document.getElementById('onsetDate').value;
    
    if (disease) {
        resultBox.style.display = 'block';
        
        const data = getDiseaseInfo(disease);
        if(data) {
            guidelineText.innerHTML = data.text.replace(/\n/g, '<br>');
            characteristicsText.textContent = data.characteristics;
            
            // 発症日から一律計算できるものは日付を出す
            if (onsetDate && data.days !== null) {
                const minDate = getMinReturnDate(onsetDate, data.days);
                calculatedDateText.textContent = `【参考】最短登園・登校可能日: ${minDate}〜 (※上記の症状回復条件も満たしている必要があります)`;
            } else {
                calculatedDateText.textContent = "";
            }
        }
    } else {
        resultBox.style.display = 'none';
    }
}

// イベントリスナーの登録
formInputs.forEach(input => {
    input.addEventListener('change', updateResult);
    input.addEventListener('input', updateResult);
});
