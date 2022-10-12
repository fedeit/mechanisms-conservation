function collapseAll(i) {
    let current = document.getElementById(`collapsable-${i}`).style.display
    let buttonLabel = ""
    if (current === "none") {
        current = "block"
        buttonLabel = "Read less"
    } else {
        current = "none"
        buttonLabel = "Read more"
    }
    document.getElementById(`collapsable-${i}`).style.display = current
    document.getElementById(`collapsable-button-${i}`).innerHTML = buttonLabel
}

function render(data) {
    let cards = ""
    data.forEach((entry, i) => {
        let htmlEntry = `<div class="card" style="border-style: solid;margin: 20px 0px;">
            <div class="card-body">
                <h3 class="card-title">${entry.name}</h3>
                <h4 class="text-muted card-subtitle mb-2">${entry.interview_date} - ${entry.location}<br></h4>
                <p class="card-text"><span style="color: rgb(0, 0, 0); background-color: transparent;">${entry.overview}</span><br></p>
                <div class="row" id="collapsable-${i}">
                    <div class="col">
                        <p class="fw-semibold formCheck-1-hide"><span style="color: rgb(0, 0, 0); background-color: transparent;">General museum information</span></p>
                        <p class="formCheck-1-hide" style="white-space: pre-wrap">${entry.general_info}</p>
                        
                        <p class="fw-semibold formCheck-2-hide"><span style="color: rgb(0, 0, 0); background-color: transparent;">Conservation decision making</span></p>
                        <p class="formCheck-2-hide" style="white-space: pre-wrap">${entry.decision_making}</p>

                        <p class="fw-semibold formCheck-3-hide">Preventive conservation strategies<br></p>
                        <p class="formCheck-3-hide" style="white-space: pre-wrap">${entry.preventative_measures}</p>

                        <p class="fw-semibold formCheck-8-hide"><span style="color: rgb(0, 0, 0); background-color: transparent;">Artifact's parts replacement policy</span></p>
                        <p class="formCheck-8-hide" style="white-space: pre-wrap">${entry.replacement_policy}</p>

                        <p class="formCheck-10-hide fw-semibold"><span style="color: rgb(0, 0, 0); background-color: transparent;">Knowledge sharing of conservation methods</span></p>
                        <p class="formCheck-10-hide" style="white-space: pre-wrap">${entry.knowledge_sharing}</p>

                    </div>
                    <div class="col">
                        <p class="formCheck-6-hide fw-semibold"><span style="color: rgb(0, 0, 0); background-color: transparent;">Conservation methods</span></p>
                        <p class="formCheck-6-hide" style="white-space: pre-wrap">${entry.conservation_methods}</p>

                        <p class="formCheck-4-hide fw-semibold"><span style="color: rgb(0, 0, 0); background-color: transparent;">Acquisition of artifacts</span></p>
                        <p class="formCheck-4-hide" style="white-space: pre-wrap">${entry.artifact_onboarding}</p>

                        <p class="formCheck-7-hide fw-semibold"><span style="color: rgb(0, 0, 0); background-color: transparent;">Conservation state</span></p>
                        <p class="formCheck-7-hide" style="white-space: pre-wrap">${entry.conservation_states}</p>

                        <p class="formCheck-5-hide fw-semibold"><span style="color: rgb(0, 0, 0); background-color: transparent;">Materials of the artifacts</span></p>
                        <p class="formCheck-5-hide" style="white-space: pre-wrap">${entry.materials}</p>

                        <p class="formCheck-9-hide fw-semibold"><span style="color: rgb(0, 0, 0); background-color: transparent;">Long-term storage and documentation</span></p>
                        <p class="formCheck-9-hide" style="white-space: pre-wrap">${entry.post_restoration}</p>
                        <p><br></p>
                    </div>
                </div><button class="btn btn-secondary" id="collapsable-button-${i}" type="button" onclick="collapseAll(${i})">Collapse</button>
            </div>
        </div>`
        cards += htmlEntry
    })

    document.getElementById("conservation-cards").innerHTML = cards
    document.getElementById("num-conservation-cards").innerHTML = `<strong>${data.length} results</strong>`

    Array.from({length: 10}, (_, i) => i + 1)
    .forEach( i => {
        let target = document.getElementById(`formCheck-${i}`)
        console.log(i, target)
        if (target.checked === true) {
            let sections = document.getElementsByClassName(`${target.id}-hide`)
            for (const section of sections) {
                section.style.display = "block"
            }
        } else {
            let sections = document.getElementsByClassName(`${target.id}-hide`)
            for (const section of sections) {
                section.style.display = "none"
            }
        }
    })

    data.forEach((_, i) => {
        collapseAll(i)
    })
}

function searchText() {
    let textQuery =
    document.getElementById(`text-search`)
    .value
    .toLowerCase()

    let conservatorTypeQuery = document.getElementById("conservator_type").value

    let artifactTypeQuery = document.getElementById("artifact_type").value
    console.log(conservatorTypeQuery, artifactTypeQuery)

    let dataFilter = db
    .filter( e => {
        return Object
        .values(e).join()
        .toLowerCase()
        .indexOf(textQuery) > -1
    })

    if (conservatorTypeQuery !== "All") {
        dataFilter = dataFilter.filter( e => {
            return e["conservator_type"] === conservatorTypeQuery
        })
    }
    if (artifactTypeQuery !== "All") {
        dataFilter = dataFilter.filter( e => {
            return e["artifact_type"] === artifactTypeQuery
        })
    }

    render(dataFilter)
}

render(db)

Array.from({length: 10}, (_, i) => i + 1)
.forEach( i => {
    document.getElementById(`formCheck-${i}`)
    .onclick = searchText
})

let conservatorTypeQuery = document.getElementById("conservator_type").onchange = searchText

let artifactTypeQuery = document.getElementById("artifact_type").onchange = searchText
