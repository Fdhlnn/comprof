<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contacts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserContactsController extends Controller
{
    public function index()
    {
        return Inertia::render('comprof/contacts');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        Contacts::create([
            'name'    => $validated['name'],
            'email'   => $validated['email'],
            'message' => $validated['message'],
            'read'    => false,
        ]);

        return redirect()->back()->with('success', 'Pesan berhasil dikirim!');
    }
}
