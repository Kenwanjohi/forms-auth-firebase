import React from 'react';
import { WithFirebase } from '../Firebase/firebase';
const SignOutButton = ({ firebase }) => (
    <button type="button" onClick={firebase.doSignOut}>
    Sign Out
    </button>
);
export default WithFirebase(SignOutButton);