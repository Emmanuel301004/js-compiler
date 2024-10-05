import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  code: string = '';  // Textarea input
  output: string = '';  // Output display

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'r') {
      event.preventDefault();  // Prevent the default browser refresh behavior
      this.runCode();  // Trigger the runCode function
    }
  }

  runCode() {
    this.output = '';  // Clear previous output

    const originalConsoleLog = console.log;  // Save the original console.log

    try {
      // Override console.log to capture the output
      console.log = (message: any) => {
        this.output += message + '\n';  // Append each log to the output
      };

      // Execute the code from the textarea
      new Function(this.code)();

    } catch (error) {
      this.output = `Error: ${error}`;  // Show any errors in the output
    } finally {
      // Restore the original console.log after execution
      console.log = originalConsoleLog;
    }
  }
  redirectToFeedback() {
    window.location.href = 'https://forms.gle/VdZMxEeKmRGyfatp9';
}

}
