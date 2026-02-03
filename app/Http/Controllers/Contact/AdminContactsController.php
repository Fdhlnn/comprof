<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contacts;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;


class AdminContactsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $messages = Contacts::when($search, function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('message', 'like', "%{$search}%");
        })
            ->orderBy('read', 'asc')
            ->latest()
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('admin/contacts', [
            'messages' => $messages,
            'unreadCount' => Contacts::where('read', false)->count(),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function markAsRead(Contacts $contact)
    {
        $contact->update(['read' => true]);
        return back();
    }

    public function destroy(Contacts $contact)
    {
        $contact->delete();
        return back()->with('success', 'Pesan dihapus');
    }

    public function reply(Request $request, Contacts $contact)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);


        Mail::raw($request->message, function ($mail) use ($request) {
            $mail->to($request->email)
                ->subject('Reply from Faith Industries');
        });

        return back()->with('success', 'Reply sent successfully!');
    }
}
