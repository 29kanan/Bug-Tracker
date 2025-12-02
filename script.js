let bugs = [];
const bugList = document.getElementById("bugList");
const bugFilter = document.getElementById("bugFilter");

function addBug(){
    const title = document.getElementById("bugTitle");
    const desc = document.getElementById("bugDesc");
    const severity = document.getElementById("bugSeverity");

    const bug = {
        id: Date.now(),
        title: title.value, 
        severity: severity.value, 
        desc: desc.value,
        status: 'new',
        date: new Date().toLocaleDateString()
    };

    bugs.push(bug);
    title.value = '';
    desc.value = '';
    severity.value = 'Low';
    renderBugs();
}

function updateBug(id, newStatus){
    const bug = bugs.find(b => b.id === id);
    if(bug){
        bug.status = newStatus;
        renderBugs();
    }
}

function filterBugs(view){
    let filtered;
    if(view === "all"){
        filtered = bugs;
    }
    else if(view === "new"){
        filtered = bugs.filter(b => b.status === "new");
    }
    else if(view === "open"){
        filtered = bugs.filter(b => b.status === "open");
    }
    else if(view === "fixed"){
        filtered = bugs.filter(b => b.status === "fixed");
    }

    renderBugs(filtered);
}

function renderBugs(bugsToRender = bugs){
    bugList.innerHTML = "";
    
    bugsToRender.forEach((bug,idx) => {
        const li = document.createElement("li"); 
        li.innerHTML = `<div class="bug-header">
            <span class="bug-title">${bug.title}</span>
            <span class="bug-severity severity-${bug.severity.toLowerCase()}"</span>
        </div>
        <div class="bug-desc">${bug.desc}</div>
        <div class="bug-footer">
            <span class="bug-date">${bug.date}</span>
            <div class="bug-status>
                <span class="status-badge status-${bug.status.toLowerCase()}">${bug.status}</span>
                <span class="status-btns">
                    ${bug.status === "new" ? '<button type="button" onclick="updateBug(' + bug.id + ', \'open\')">Open</button>' : ''}
                    ${bug.status === 'open' ? '<button type="button" onclick="updateBug(' + bug.id + ', \'fixed\')">Fix</button>' : ''}
                    ${bug.status === 'fixed' ? '<button type="button" onclick="updateBug(' + bug.id + ', \'open\')">Reopen</button>' : ''}
                </span>
            </div>
        </div>`;
        bugList.appendChild(li);
    });
}

function clearBugs(){
    if(confirm('Are you sure you want to delete all bugs?')){
        bugs = [];
        renderBugs();
    }
}

bugFilter.addEventListener('change', function() {
    filterBugs(this.value);
});