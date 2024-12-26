<?php

namespace App\Http\Controllers\Customer\Auth;

use App\Models\customer;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('customer.auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.customer::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $customer = customer::create([
            'Customer_name' => $request->Customer_name,
            'email' => $request->email,
            'type' => 'customer',
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($customer));

        Auth::guard('customer')->login($customer);

        return redirect(route('customer.dashboard', absolute: false));
    }
}
