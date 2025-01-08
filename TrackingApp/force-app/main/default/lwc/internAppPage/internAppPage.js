import { LightningElement } from 'lwc';

export default class InternTracker extends LightningElement {
  interns = [];
  internName = '';
  internRole = '';

  handleNameChange(event) {
    this.internName = event.target.value;
  }

  handleRoleChange(event) {
    this.internRole = event.target.value;
  }

  addIntern() {
    if (this.internName && this.internRole) {
      const newIntern = {
        id: this.interns.length + 1,
        name: this.internName,
        role: this.internRole,
      };
      this.interns = [...this.interns, newIntern];
      this.internName = '';
      this.internRole = '';
    }
  }
}
