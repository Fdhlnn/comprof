<?php

namespace App\Http\Controllers\Dashboard;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\Events;
use App\Models\Clients;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'articles' => Article::count(),
            'gallery'  => Gallery::count(),
            'events'   => Events::count(),
            'clients'  => Clients::count(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }

}
