<?php

namespace App\Http\Controllers\Customer\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->customer()->hasVerifiedEmail()) {
            return redirect()->intended(route('customer.dashboard', absolute: false));
        }

        $request->customer()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }
}
