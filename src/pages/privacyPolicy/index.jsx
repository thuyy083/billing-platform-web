import { Link } from "react-router-dom";
import "./PrivacyPolicy.scss";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <p>
          <strong>Last Updated:</strong> July 14, 2026
        </p>

        <p>
          Thank you for using <strong>V-Billing – Collection Management System</strong>.
          We value your privacy and are committed to protecting the information
          processed through our application.
        </p>

        <h2>About V-Billing</h2>

        <p>
          V-Billing is an internal collection management application designed
          for authorized employees to manage customer information, collection
          records, payment status, and related business operations.
        </p>

        <h2>1. Information We Collect</h2>

        <p>The application may process the following information:</p>

        <ul>
          <li>User account information</li>
          <li>Authentication credentials</li>
          <li>Customer information assigned to authorized employees</li>
          <li>Collection and payment records</li>
          <li>Application usage logs</li>
          <li>Technical device information required for security and performance</li>
        </ul>

        <h2>2. How We Use Your Information</h2>

        <p>Your information is used only for legitimate business purposes, including:</p>

        <ul>
          <li>User authentication</li>
          <li>Managing customer collection activities</li>
          <li>Recording payment transactions</li>
          <li>Generating operational reports</li>
          <li>Improving application performance</li>
          <li>Maintaining system security</li>
        </ul>

        <h2>3. Data Storage</h2>

        <p>
          All information is stored securely on company-managed servers.
          Access is restricted to authorized personnel based on role-based
          permissions.
        </p>

        <h2>4. Data Sharing</h2>

        <p>
          We do not sell, rent, or disclose personal information to third
          parties except when required by applicable law or necessary for
          authorized business operations.
        </p>

        <h2>5. Data Retention</h2>

        <p>
          Information is retained only for operational, auditing, and legal
          purposes. Data is deleted or archived according to the organization's
          data retention policies.
        </p>

        <h2>6. Security</h2>

        <p>We implement appropriate security measures, including:</p>

        <ul>
          <li>Secure HTTPS communication</li>
          <li>Role-based access control</li>
          <li>User authentication and authorization</li>
          <li>System monitoring and logging</li>
          <li>Protection against unauthorized access</li>
        </ul>

        <h2>7. Children's Privacy</h2>

        <p>
          V-Billing is intended solely for authorized business users and is not
          designed for or directed toward children under the age of 13.
        </p>

        <h2>8. Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be published on this page together with the updated revision date.
        </p>

        <h2>9. Contact Us</h2>

        <p>
          If you have any questions regarding this Privacy Policy or the way
          your information is processed, please contact us:
        </p>

        <p>
          <strong>V-Billing Development Team</strong>
          <br />
          Email: vothicamthuy0803@gmail.com
          <br />
          Working Hours: Monday – Friday, 08:00 – 17:30 (GMT+7)
        </p>

        <p>
          For technical assistance, please visit our{" "}
          <strong>
            <Link to="/support">Support</Link>
          </strong>{" "}
          page.
        </p>
      </div>
    </div>
  );
}