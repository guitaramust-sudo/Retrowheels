class TeamMemberController {
  constructor() {
    this.teamMembers = [];
    this.activeMember = null;
    this.init();
  }

  init() {
    this.teamMembers = document.querySelectorAll("[data-js-team-member]");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.teamMembers.forEach((member) => {
      member.addEventListener("click", (e) => {
        this.handleMemberClick(e.currentTarget);
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("[data-js-team-member]")) {
        this.deactivateAll();
      }
    });
  }

  handleMemberClick(clickedMember) {
    if (clickedMember.classList.contains("active")) {
      this.deactivateAll();
      return;
    }

    this.deactivateAll();

    clickedMember.classList.add("active");
    this.activeMember = clickedMember;
  }

  deactivateAll() {
    this.teamMembers.forEach((member) => {
      member.classList.remove("active");
    });
    this.activeMember = null;
  }
}

export default TeamMemberController;
