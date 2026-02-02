<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contacts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $messages = Contacts::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            })
            ->orderBy('read', 'asc')
            ->orderBy('created_at', 'desc')
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

        return back()->with('success', 'Pesan berhasil dihapus');
    }
}
